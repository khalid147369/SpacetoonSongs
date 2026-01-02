import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Image {
    _id: string;
    title: string;
    type: 'slider' | 'ourheros';
    position: number;
    image: string;
}
export const useImagesStore = defineStore('images', () => {

    const images = ref<Image[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const fetched = ref(false);

    async function fetchAll() {
        const config = useRuntimeConfig();
        // Prevent duplicate fetches
        if (loading.value) return;

        loading.value = true;
        error.value = null;

        try {
            images.value = await $fetch<Image[]>(`${config.public.apiBase}/images`);
            fetched.value = true;
        } catch (err) {
            console.error('Failed to fetch images:', err);
            error.value = err instanceof Error ? err.message : 'Failed to fetch images';
        } finally {
            loading.value = false;
        }
    }

    // Retry mechanism
    async function retryFetch() {
        error.value = null;
        await fetchAll();
    }

    // upload images

    function uploadImage(file: File, title: string) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
    }

    return {
        images,
        loading,
        error,
        fetched,
        fetchAll,
        retryFetch,
        uploadImage
    };
    
});