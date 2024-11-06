"use client"
import { logout } from "@/firebase/firebaseauth"

export default function Navbar({ title }: any) {

  return (

    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li>
            <details>
              <summary>Setting</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>Link 1</a></li>
                <li><a onClick={
                  () => { logout() }}>logOut</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}