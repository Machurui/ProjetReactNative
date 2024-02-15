import { signOut } from "firebase/auth";
import { auth } from "./Firebase";

export const signOutFun = async (): Promise<{ success: boolean; message?: string }> => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        return { success: true, message: "User signed out successfully" };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, message };
    }
};