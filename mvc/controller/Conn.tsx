
import { signInWithEmailAndPassword } from "firebase/auth";
import User from "../model/User";
import { auth } from "./Firebase";

export const signIn = async (User: User) => {
    try {
        await signInWithEmailAndPassword(auth, User.email, User.password);
        console.log("User signed in successfully");
    } catch (error) {
        console.log(error);
    }
}