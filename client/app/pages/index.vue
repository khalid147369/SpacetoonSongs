<script setup lang="ts">
useHead({
  title: "Spacetoon",
});
import ImageSlider from "../components/ImageSlider.vue";
import { useSongsStore } from "../../stores/songs";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

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
          <NuxtImg
            class="w-full rounded-t-lg object-cover"
            src="/imgs/lu.png"
            width="320"
            height="300"
            sizes="(max-width: 640px) 100vw, 320px"
            format="webp"
            loading="lazy"
            decoding="async"
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
          <NuxtImg
            class="w-full rounded-t-lg object-cover"
            src="/imgs/na.png"
            width="320"
            height="300"
            sizes="(max-width: 640px) 100vw, 320px"
            format="webp"
            loading="lazy"
            decoding="async"
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
          <NuxtImg
            class="w-full rounded-t-lg object-cover"
            src="/imgs/go.png"
            width="320"
            height="300"
            sizes="(max-width: 640px) 100vw, 320px"
            format="webp"
            loading="lazy"
            decoding="async"
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
          <NuxtImg
            class="h-48 mb-4 rounded-lg w-full object-cover"
            :src="song.image"
            :alt="song.title"
            format="webp"
            sizes="(max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,320px"
            loading="lazy"
            decoding="async"
          />
          <CustomAudioPlayer class="w-full mb-4 rounded-lg" :src="song.audio" />
        </div>
      </div>
    </div>
  </div>
</template>
