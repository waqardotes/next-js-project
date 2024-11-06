"use client";

import { UserType } from "@/app/types/user-type";
import { app, db } from "@/firebase/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type AuthContextProviderType = {
    children: ReactNode
}

type AuthContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<UserType | null>(null);

    const route = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                fetchUserData(uid);
            }
            else {
                console.log('inside onauthstatechange else statement');
                setUser(null);
                route.push("/");
            }
        });
    }, []);

    const fetchUserData = async (uid: string) => {
      let docRef = doc(db, "users", uid);
      try {
        let userFound = await getDoc(docRef);
        let user = userFound.data();
        console.log('Auth try', user);
        if (user?.role === "company") {
          route.push("/company/all-jobs");
        } else if (user?.role === "job seeker") {
          route.push("/jobseeker")
        }
        
        if (!user) return;
        setUser(user as UserType)
      } catch (e) {
        console.error("AuthContextProvidr error", e);
      }
    }

    return (
        <AuthContext.Provider value={{ user, setUser }} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);