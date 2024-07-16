
import { ID } from "appwrite";
import { ref } from "vue";
import { account } from "../utils/appwrite";
import { type Models } from 'appwrite';

const current = ref<Models.Session | null>(null); // Reference to current user object

export const useUserSession = () =>  {
    const register = async (email: string, password: string): Promise<void> => {
        await account.create(ID.unique(), email, password); // Register new user in Appwrite
        await login(email, password); // Login registered user
    };

    const login = async (email: string, password: string): Promise<void> => {
        const authUser = await account.createEmailPasswordSession(email, password); // Open user session in Appwrite
        current.value = authUser; // Pass user data to current ref
        navigateTo("/");
    };

    const logout = async (): Promise<void> => {
        await account.deleteSession("current"); // Delete Appwrite user session
        current.value = null; // Clear current ref
        navigateTo("/");
    };

    // Check if already logged in to initialize the store.
    account.getSession('current').then((user: Models.Session) => {
        current.value = user;
    });

    return {
        current,
        login,
        logout,
        register,
    };
};