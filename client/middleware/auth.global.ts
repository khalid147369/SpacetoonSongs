export default defineNuxtRouteMiddleware(async (to, from) => {
    // Skip middleware on login and register pages
    if (to.path === '/login' || to.path === '/register') {
        return;
    }

    const { accessToken, refresh } = useAuthStore();

    // If there's a token, try to refresh it to validate the session
    if (accessToken.value) {
        try {
            await refresh();
        } catch (error) {
            // refresh() already handles logout on failure,
            // so the user will be redirected to /login
            console.log('Session expired, logging out.');
        }
    } else if (to.path !== '/login' && to.path !== '/register') {
        // If there's no token and the user is not on a public page,
        // redirect them to login.
        // This protects pages that are not explicitly public.
        return navigateTo('/login');
    }
});
