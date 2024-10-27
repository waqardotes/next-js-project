"use client";

import AuthForm from "@/components/authform";
import { auth } from "@/firebase/firebaseauth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const login = async (email: string, password: string) => {
    console.log("Login Function", email, password);
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;
      console.log(userData, "userData");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1>LogIn</h1>
        <AuthForm
          func={login}
        />
        <p>Do not have an account?
          <Link href={"./signup"}>
            Signup here.
          </Link>
        </p>
      </div>
    </>
  );
}