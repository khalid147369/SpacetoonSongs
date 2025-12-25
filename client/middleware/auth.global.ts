export default defineNuxtRouteMiddleware((to) => {
    const { accessToken } = useAuthStore();

    const protectedPages = ['/panel'];
    const isGoingToProtectedPage = protectedPages.includes(to.path);

    // If user is logged in and tries to access login or register page, redirect to home.
    if (accessToken.value && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/');
    }
});