// stores/songs.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Song {
  _id: string;
  title: string;
  image: string;
  audio: string;
}

export const useSongsStore = defineStore('songs', () => {
  const songs = ref<Song[]>([]);
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
      songs.value = await $fetch<Song[]>(`${config.public.apiBase}/songs`);
      fetched.value = true;
    } catch (err) {
      console.error('Failed to fetch songs:', err);
      error.value = err instanceof Error ? err.message : 'Failed to fetch songs';
    } finally {
      loading.value = false;
    }
  }

  // Retry mechanism
  async function retryFetch() {
    error.value = null;
    await fetchAll();
  }

  return {
    songs,
    loading,
    error,
    fetched,
    fetchAll,
    retryFetch,
  };
});