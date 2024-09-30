"use client";

import AuthForm from "@/components/authform";
import { signupWithEmailPassword } from "@/firebase/firebaseauth";
import Link from "next/link";

export default function Signup() {
  const signup = (email: string, password: string, rollNum?: any, studentName?: any) => {
    console.log("Signup Function", email, password, rollNum, studentName);
    signupWithEmailPassword(email, password, rollNum, studentName);
  };
  return (
    <>
    <h1>SignUp</h1>
      <AuthForm 
        btnFunc={signup}
        btnLabel={"Signup"} 
    />
      <Link href={"./login"}>
        <p>Already have an account? Login here.</p>
      </Link>
    </>
  );
}