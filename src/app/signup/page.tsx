"use client";

import { signupWithEmailPassword } from "@/firebase/firebaseauth";
import AuthForm from "../components/authform";
import Link from "next/link";

export default function Signup() {
  const signup = (email: string, password: string) => {
    // console.log("Signup Function", email, password);
    signupWithEmailPassword(email, password);

  };
  return (
    <>
      <h2>SignUp</h2>
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