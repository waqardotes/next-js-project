"use client"
import { auth, logout } from "@/firebase/firebaseauth";
import { db, saveTodo } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData, Unsubscribe, collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const options = ['Groceries', 'Rent'];
  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const [allTodos, setAllTodos] = useState<DocumentData[]>([]);


  useEffect(() => {
    let detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodosRealtime();
      }
    })

    return () => {
      if (readTodosRealtime) {
        console.log("Component Unmount.");
        readTodosRealtime();
        detachOnAuthListiner();
      }
    }

  }, [])

  let readTodosRealtime: Unsubscribe;

  const fetchTodosRealtime = () => {
    let collectionRef = collection(db, "todos");
    let currentUserUID = auth.currentUser?.uid;
    let condition = where("uid", "==", currentUserUID);
    let q = query(collectionRef, condition);
    let allTodosClone = [...allTodos];

    readTodosRealtime = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let todo = change.doc.data();
          todo.id = change.doc.id;
          allTodosClone.push(todo);
          setAllTodos([...allTodosClone])
        }
        if (change.type === "modified") {
          console.log('data modified');
        }
        if (change.type === "removed") {
        }
      })
    })



  }

  return (
    <>
      <button onClick={
        () => { logout() }}
      >
        Login
      </button>
      <Link href={"./about"}>About</Link>
      <h1>Expense Tracker</h1>

      <select
        value={title}
        onChange={handleChange}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => { setAmount(e.target.value) }}
      />

      <button onClick={() => {
        saveTodo(title, amount);
        setTitle('');
        setAmount('');
      }}>Add New Todo</button>

      {
        allTodos.length > 0 ?
          allTodos.map(({ todo }) => <h1>{todo?.title}</h1>) :
          <></>
      }

    </>
  )
}