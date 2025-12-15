import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Song {
  _id: string;
  title: string;
  image: string;
  audio: string;
}

export const useSongsStore = defineStore('songs', () => {
  const songs = ref<Song[]>([]);

  const fetchAll = async () => {
    try {
      const config = useRuntimeConfig();
      const data = await $fetch<Song[]>(`${config.public.apiBase}/songs`);
      songs.value = data;
    } catch (error) {
      console.error('Failed to fetch songs:', error);
    }
  };

  return { songs, fetchAll };
});
