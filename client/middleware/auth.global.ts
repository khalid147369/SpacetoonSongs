export default defineNuxtRouteMiddleware(async (to, from) => {
    const { accessToken, user } = useAuthStore();

    console.log('--- Auth Middleware Running ---');
    console.log('Navigating to:', to.path);
    console.log('Access token exists:', !!accessToken.value);

    // Public routes - no auth required
    const publicRoutes = ['/login', '/register'];
    if (publicRoutes.includes(to.path)) {
        console.log('On public page, skipping auth logic.');
        return;
    }

    // If no token, redirect to login
    if (!accessToken.value) {
        console.log('No token found, redirecting to login.');
        return navigateTo('/login');
    }

    // Token exists and user is authenticated - allow navigation
    console.log('Token valid, allowing navigation.');
    console.log('--- Auth Middleware End ---');
});