// plugins/api.ts
export default defineNuxtPlugin(() => {
    const { accessToken, refresh, logout } = useAuthStore();
    const config = useRuntimeConfig();

    let isRefreshing = false;
    let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

    const processQueue = (error: any, token: string | null = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        failedQueue = [];
    };

    // Add global fetch interceptor
    globalThis.$fetch = $fetch.create({
        onRequest({ request, options }) {
            console.log('🌐 API Request:', request);

            // Add auth token to all requests if available
            if (accessToken.value) {
                if (!options.headers) {
                    options.headers = {};
                }
                (options.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken.value}`;
                console.log('🔑 Token added to request');
            } else {
                console.log('⚠️ No token available for request');
            }
        },

        async onResponseError({ response, request, options }) {
            console.log('❌ Response Error:', response.status, request);

            // If we get 401 Unauthorized
            if (response.status === 401) {
                const originalRequest = options;

                // Don't retry refresh or logout endpoints
                if (typeof request === 'string' &&
                    (request.includes('refresh-token') || request.includes('logout'))) {
                    console.log('⚠️ Auth endpoint failed, not retrying');
                    return;
                }

                // Check if we have a token to refresh
                if (!accessToken.value) {
                    console.log('❌ No token to refresh, logging out');
                    await logout();
                    return;
                }

                // If already refreshing, queue this request
                if (isRefreshing) {
                    console.log('⏳ Refresh in progress, queuing request');
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(() => {
                        // Retry with new token
                        if (!originalRequest.headers) {
                            originalRequest.headers = {};
                        }
                        (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken.value}`;
                        return $fetch(request, originalRequest);
                    });
                }

                isRefreshing = true;

                try {
                    // Try to refresh the token
                    console.log('🔄 Got 401, attempting token refresh...');
                    await refresh();

                    console.log('✅ Refresh successful, retrying original request');
                    processQueue(null, accessToken.value);

                    // Retry the original request with new token
                    if (!originalRequest.headers) {
                        originalRequest.headers = {};
                    }
                    (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken.value}`;

                    return await $fetch(request, originalRequest);
                } catch (error) {
                    // Refresh failed, logout user
                    console.error('❌ Token refresh failed, logging out');
                    processQueue(error, null);
                    await logout();
                } finally {
                    isRefreshing = false;
                }
            }
        }
    });
});