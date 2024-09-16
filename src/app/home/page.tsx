"use client"
import { logout } from "@/firebase/firebaseauth";

export default function Home() {
  return (
    <>
    <h1>Hello Home</h1>

    <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </>
  )
}