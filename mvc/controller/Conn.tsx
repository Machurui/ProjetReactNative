
import { signInWithEmailAndPassword } from "firebase/auth";
import User from "../model/User";
import { auth } from "./Firebase";

export const signIn = async (user: User): Promise<{ success: boolean; message?: string }> => {
    try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
        console.log("User signed in successfully");
        return { success: true, message: "User signed in successfully" };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message };
    }
};