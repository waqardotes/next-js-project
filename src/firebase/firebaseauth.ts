import { app } from '@/firebase/firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { saveUser } from './firebasefirestore';

export const auth = getAuth(app);

export function signupWithEmailPassword(email: string, password: string, rollNum: string, studentName: string) {
    console.log(email, password, 'inside func')
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const { email, uid } = userCredential.user;
            console.log(email, uid, 'user created successfully.', userCredential);
            
            saveUser({ email: email as string, uid, rollNum, studentName });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            // ..
        });
}


export function loginWithEmailPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const { email, uid } = userCredential.user;

            console.log(email, uid, 'user LOGGED IN successfully.', userCredential);

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);

        });
}

export function logout() {

    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('sucessfully logout')
      }).catch((error) => {
        // An error happened.
      });
} 