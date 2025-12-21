export default defineNuxtRouteMiddleware(async (to, from) => {
    const { accessToken, refresh } = useAuthStore();
    console.log('--- Auth Middleware Running ---');
    console.log('Navigating to:', to.path);
    console.log('Access token exists:', !!accessToken.value);

    // Skip middleware on login and register pages
    if (to.path === '/login' || to.path === '/register') {
        console.log('On public page, skipping auth logic.');
        return;
    }

    // If there's a token, try to refresh it to validate the session
    if (accessToken.value) {
        console.log('Token found, attempting to refresh session...');
        try {
            await refresh();
            console.log('Session successfully refreshed.');
        } catch (error) {
            // The refresh function itself calls logout(), which will cause navigation.
            // The console log below might not even be reached if navigation is immediate.
            console.error('Middleware: Failed to refresh session. Logout should be triggered.');
        }
    } else {
        // If there's no token and the user is not on a public page, redirect to login.
        console.log('No token found, redirecting to login.');
        return navigateTo('/login');
    }
    console.log('--- Auth Middleware End ---');
});

