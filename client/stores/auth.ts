import { defineStore } from 'pinia'

interface LoginResponse {
    user: any;
    accessToken: string;
}
interface RegisterResponse {
    user: any;
    accessToken: string;
}

export const useAuthStore = defineStore('auth', () => {
    // Production-ready cookie options
    const cookieOptions = {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        sameSite: 'lax' as const, // Important for cross-site cookies
        secure: process.env.NODE_ENV === 'production', // Only secure in production
    }
    
    const user = useCookie<any>('auth_user', cookieOptions);
    const accessToken = useCookie('auth_token', cookieOptions);
    const config = useRuntimeConfig();
    
    // register function
    const register = async (name: string, email: string, password: string) => {
        try {
            const data = await $fetch<RegisterResponse>(`${config.public.apiBase}/users/register`, {
                method: 'POST',
                body: { username: name, email, password },
                credentials: 'include' // Important for cookies
            });
            user.value = data.user;
            accessToken.value = data.accessToken;
        } catch (error) {
            throw error;
        }
    };
    
    // login function
    const login = async (email: string, password: string) => {
        try {
            const data = await $fetch<LoginResponse>(`${config.public.apiBase}/users/login`, {
                method: 'POST',
                body: { email, password },
                credentials: 'include' // Important for cookies
            })
            user.value = data.user;
            accessToken.value = data.accessToken;
        } catch (error) {
            throw error;
        }
    };
    
    // logout function to clear user data
    const logout = async () => {
        const token = accessToken.value;
        
        // Clear local state first
        user.value = null;
        accessToken.value = '';
        
        // Then try to tell backend (don't block on failure)
        if (token) {
            try {
                await $fetch(`${config.public.apiBase}/users/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                });
            } catch (error: any) {
                console.error('Logout API call failed:', error);
            }
        }
        
        // Navigate to login
        await navigateTo('/login');
    };

    // refresh token 
    const refresh = async () => {
        try {
            const data = await $fetch<LoginResponse>(`${config.public.apiBase}/users/refresh-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken.value}`
                },
                credentials: 'include' // Ensure cookies are sent
            });
            user.value = data.user;
            accessToken.value = data.accessToken;
            console.log('Token refresh successful.');
        } catch (error) {
            console.error('Token refresh failed:', error);
            // Clear auth and redirect
            user.value = null;
            accessToken.value = '';
            await navigateTo('/login');
            throw error;
        }
    };

    return { user, accessToken, login, register, logout, refresh };
})