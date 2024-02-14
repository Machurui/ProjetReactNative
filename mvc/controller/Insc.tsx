import { createUserWithEmailAndPassword } from "firebase/auth";
import User from "../model/User";
import { auth } from "./Firebase";

export const signUp = async (user: User): Promise<{ success: boolean; message?: string }> => {
    try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        console.log("User created successfully");
        return { success: true, message: "User created successfully" };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message };
    }
};