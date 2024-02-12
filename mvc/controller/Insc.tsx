import { createUserWithEmailAndPassword } from "firebase/auth";
import User from "../model/User";
import { auth } from "./Firebase";

export const signUp = async (User: User) => {
    try {
        await createUserWithEmailAndPassword(auth, User.email, User.password);
        console.log("User created successfully");
    } catch (error) {
        console.log(error);

    }
}