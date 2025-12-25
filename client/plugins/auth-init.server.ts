export default defineNuxtPlugin(() => {
    // By accessing the store here, we are ensuring that the `useCookie`
    // composable within it is executed on the server before any navigation
    // or page rendering begins. This guarantees that the accessToken
    // is populated from the request cookie right at the start.
    useAuthStore();
});
