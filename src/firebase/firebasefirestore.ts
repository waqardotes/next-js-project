import { addDoc, collection, doc, getFirestore, setDoc, where , query, getDocs,  } from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauth";

export const db = getFirestore(app);

type UserType = {
    email: string,
    rollNum: string,
    studentName: string,
    uid: string
}

export async function saveUser(user: UserType) {
    // let docRef = doc(db, "collectionName", "docId")
    // await setDoc("where", "what");

    try {
        let docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }
}

export async function saveTodo(title: any, amount: string,) {
    // collection(db, "collectionName")
    // addDoc("where", "what");
  
    let uid = auth.currentUser?.uid;
    let newTodo = { uid, title, amount };

    console.log('newtodo obj', newTodo);
  
    try {
      let collectionRef = collection(db, "todos");
      await addDoc(collectionRef, newTodo);
    } catch (error) {
      console.log(error);
    }
  }

  export async function fetchTodos() {
    // let docRef = doc(db, "collectionName", "docID");
    // await getDoc(docRef);
  
    // let collectionRef = collection(db, "collectionName");
    // query(where, condition)
    // await getDocs(collectionRef);
  
    let collectionRef = collection(db, "todos");
    let currentUserUID = auth.currentUser?.uid;
  
    let condition = where("uid", "==", currentUserUID);
    let q = query(collectionRef, condition);
  
    let allTodosSnapshot = await getDocs(q);
  
    let allTodos = allTodosSnapshot.docs.map((todoSnapshot) => {
      let todo = todoSnapshot.data();
      todo.id = todoSnapshot.id;
      return todo

    })

  
  return allTodos
  }