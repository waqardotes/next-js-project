"use client";

import AuthForm from "@/components/authform";
import { auth } from "@/firebase/firebaseauth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { UserRole } from "../types/user-role-type";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebasefirestore";
import { useRouter } from "next/navigation";

export default function Signup() {
  const route = useRouter();

  const signup = async (email: string, password: string, role?: any) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;
      saveUserInFireStore(email, userData.uid, role);
    } catch (e) {
      console.error(e);
    }
  }

  const saveUserInFireStore = async (
    email: string,
    uid: string,
    role: UserRole
  ) => {
    let user = {email, uid, role};
    let docRef = doc(db, "users", uid);
    await setDoc(docRef, user);
    if (role === "company") {
      route.push("/company/all-jobs");
    } else if (role === "job seeker") {
      route.push("/jobseeker")
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1>SignUp</h1>
        <AuthForm
          signup={true}
          func={signup}
        />
        
          <p>Already have an account?<Link href={"./login"}> Login here.
        </Link></p>
      </div>
    </>
  );
}