// plucked defineStore from pinia to create our auth store
import { defineStore } from 'pinia'
import { ref } from "vue";
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
    const user = useCookie<any>('auth_user');
    const token = useCookie('auth_token');
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
    }
    // Logout function to clear user and token
    const logout = () => {
        user.value = null;
        token.value = '';
        navigateTo('/login')
    };

    return { user, token, login, register, logout };
})