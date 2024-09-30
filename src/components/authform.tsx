"use client";

import { useState } from "react";

type AuthFormTypes = {
  btnLabel: string;
  btnFunc: (email: string, password: string, rollNum?: string, studentName?: string) => void;
};

export default function AuthForm({ btnLabel, btnFunc }: AuthFormTypes) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [studentName, setStudentName] = useState("");
  return (
    <>
      {btnLabel == 'Signup' ? (

        <>
          <label htmlFor="studentName">Name</label><input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
            }} />
          <br />
          <label htmlFor="rollNum">rollNum</label><input
            type="text"
            id="rollNum"
            value={rollNum}
            onChange={(e) => {
              setRollNum(e.target.value);
            }} />
          <br />

        </>
      ) : (
        <> </>
      )}

      <label htmlFor="email">Email</label><input
        type="text"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }} /><br /><label htmlFor="password">Password</label><input
        type="password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }} />

      <br />
      <button
        onClick={() => {
          btnFunc(email, password, rollNum, studentName);
        }}
      >
        {btnLabel}
      </button>
    </>
  );
}