"use client"
import Link from "next/link";


export default function Home() {

  return (
    <>
      <h2>Next Js Projects</h2>
      {/* <Login ></Login> */}
      <div className="project-box">
        <h3>Expense Tacker</h3>
        <Link href={"./login"}>Sign in</Link>
      </div>


    </>
  );
}
