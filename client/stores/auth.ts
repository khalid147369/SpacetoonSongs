// plucked defineStore from pinia to create our auth store
import { defineStore } from 'pinia'

// defineStore takes two arguements (unique name, returned function)
interface LoginResponse {
    user: any;
    token: string;
}
interface RegisterResponse {
    user: any;
    token: string;
}
export const useAuthStore = defineStore('auth', () => {
    const cookieOptions = {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    }
    const user = useCookie<any>('auth_user', cookieOptions);
    const token = useCookie('auth_token', cookieOptions);
    const config = useRuntimeConfig();
    // register function to create a new user
    const register = async (name: string, email: string, password: string) => {
        try {
            const data = await $fetch<RegisterResponse>(`${config.public.apiBase}/users/register`, {
                method: 'POST',
                body: { username: name, email, password }
            });
            user.value = data.user;
            token.value = data.token;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };
    // login function to authenticate user
    const login = async (email: string, password: string) => {
        try {
            const data = await $fetch<LoginResponse>(`${config.public.apiBase}/users/login`, {
                method: 'POST',
                body: { email, password }
            })
            user.value = data.user;
            token.value = data.token;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };
    // logout function to clear user data
    const logout = async () => {
        try {
            // 1. Tell the backend to clear the secure cookie
            await $fetch(`${config.public.apiBase}/users/logout`, { method: 'POST' });
        } catch (error) {
            console.error('Logout error:', error);
        }
        
        // 2. Clear local state
        user.value = null;
        token.value = '';
        navigateTo('/login');
    };

    // refresh token 
    const refresh = async () => {
        try {
            // Updated to the specific URL you provided
            const data = await $fetch<LoginResponse>(`${config.public.apiBase}/users/refresh-token`, {
                method: 'POST'
            });
            token.value = data.token;
        } catch (error) {
            logout();
        }
    };


    return { user, token, login, register, logout, refresh };
})