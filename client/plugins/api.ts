// plugins/api.ts
export default defineNuxtPlugin(() => {
    const { accessToken, refresh, logout } = useAuthStore();
    const config = useRuntimeConfig();

    // Add global fetch interceptor
    globalThis.$fetch = $fetch.create({
        onRequest({ options }) {
            // Add auth token to all requests if available
            if (accessToken.value && options.headers) {
                (options.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken.value}`;
            }
        },
        
        async onResponseError({ response, options }) {
            // If we get 401 Unauthorized
            if (response.status === 401) {
                const originalRequest = options;
                
                // Don't retry refresh or logout endpoints
                if (originalRequest.url?.includes('refresh-token') || 
                    originalRequest.url?.includes('logout')) {
                    return;
                }

                try {
                    // Try to refresh the token
                    console.log('Got 401, attempting token refresh...');
                    await refresh();
                    
                    // Retry the original request with new token
                    if (originalRequest.headers) {
                        (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken.value}`;
                    }
                    
                    return await $fetch(originalRequest.url || '', originalRequest);
                } catch (error) {
                    // Refresh failed, logout user
                    console.error('Token refresh failed, logging out');
                    await logout();
                }
            }
        }
    });
});