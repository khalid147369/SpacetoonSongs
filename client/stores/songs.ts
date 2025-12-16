// stores/songs.ts
import { defineStore } from 'pinia';

interface Song {
  _id: string;
  title: string;
  image: string;
  audio: string;
}

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

export const useSongsStore = defineStore('songs', {
  state: (): SongsState => ({
    songs: [],
    loading: false,
    error: null,
    fetched: false,
  }),

  actions: {
    async fetchAll() {
      // Prevent duplicate fetches
      if (this.loading) return;
      
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('/api/songs');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        this.songs = data;
        this.fetched = true;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
        this.error = error instanceof Error ? error.message : 'Failed to fetch songs';
      } finally {
        this.loading = false;
      }
    },

    // Retry mechanism
    async retryFetch() {
      this.error = null;
      await this.fetchAll();
    }
  },
});