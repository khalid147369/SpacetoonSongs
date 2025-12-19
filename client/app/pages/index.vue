<script setup lang="ts">
import ImageSlider from "../components/ImageSlider.vue";

useHead({
  title: "Spacetoon",
});
import { useSongsStore } from "../../stores/songs";
import { useAuthStore } from "../../stores/auth";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import logo from "../assets/imgs/log.png";

const authStore = useAuthStore();
console.log('Is user logged in?', authStore.user);
console.log('Token exists?', authStore.token);

const songsStore = useSongsStore();
const { songs } = storeToRefs(songsStore);

onMounted(() => {
  songsStore.fetchAll();
});
</script>
<template>
  <!-- Main container with dark theme -->
  <div class="min-h-screen bg-deep-black text-white">
    <!-- Hero Section with Image Slider -->
    <section class="relative h-auto w-full overflow-hidden">
      <ImageSlider />
    </section>

    <!-- Our Heros Section -->
    <div class="py-6">
      <!-- Section Title -->
      <h2 class="text-3xl font-bold text-white text-center mb-8">Our Heros</h2>

      <!-- Heros Grid -->
      <div
        class="ourHeros cursor-pointer cards mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 px-4"
      >
        <!-- Hero Card 1 -->
        <div
          class="rounded-lg bg-dark-gray shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            class="w-full rounded-t-lg object-cover"
            src="../assets/imgs/lu.png"
            alt="Luffy"
          />
          <div class="p-5">
            <h1 class="mb-2 text-2xl font-bold tracking-tight text-white">
              Luffy
            </h1>
          </div>
        </div>
        <!-- Hero Card 2 -->
        <div
          class="rounded-lg bg-dark-gray shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            class="w-full rounded-t-lg object-cover"
            src="../assets/imgs/na.png"
            alt="Naruto"
          />
          <div class="p-5">
            <h1 class="mb-2 text-2xl font-bold tracking-tight text-white">
              Naruto
            </h1>
          </div>
        </div>
        <!-- Hero Card 3 -->
        <div
          class="rounded-lg bg-dark-gray shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            class="w-full rounded-t-lg object-cover"
            src="../assets/imgs/go.png"
            alt="Goku"
          />
          <div class="p-5">
            <h1 class="mb-2 text-2xl font-bold tracking-tight text-white">
              Goku
            </h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Songs Section Title -->
    <h2 class="text-3xl font-bold text-white text-center my-16">Songs</h2>

    <!-- Songs Grid -->
    <div
      class="container cursor-pointer mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-16"
    >
      <!-- Song Card (v-for loop) -->
      <div
        class="songs rounded-xl p-4 text-center bg-dark-gray shadow-lg transition-transform duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-medium-gray"
        v-for="song in songs"
        :key="song._id"
      >
        <div class="song">
          <h1 class="text-white mb-4 text-2xl font-bold">{{ song.title }}</h1>
          <img
            class="h-48 mb-4 rounded-lg w-full object-cover"
            :src="song.image"
            @error="($event.target as HTMLImageElement).src = logo"
            :alt="song.title"
          />
          <CustomAudioPlayer class="w-full mb-4 rounded-lg" :src="song.audio" />
        </div>
      </div>
    </div>
  </div>
</template>
