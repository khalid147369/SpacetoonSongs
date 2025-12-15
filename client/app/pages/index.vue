<script setup lang="ts">
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
  <div class="bg-[#9C41EF]">
    <div class="heroSection">
      <ImageSlider />
    </div>
    <div class="py-6">
      <div class="divider mx-auto my-10 flex items-center gap-8 px-8">
        <hr class="flex-1 border-t-4 border-white-900" />
        <h2 class="whitespace-nowrap text-4xl font-bold text-white">
          Our Heros
        </h2>
        <hr class="flex-1 border-t-4 border-white-900" />
      </div>
      <div
        class="ourHeros cards mx-8 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8"
      >
        <div
          class="w-full max-w-sm rounded-lg border border-gray-700 bg-[#1f2937] shadow"
        >
          <img
            class="w-full rounded-t-lg"
            src="../assets/imgs/lu.png"
            alt="Luffy"
          />
          <div class="p-5">
            <h1 class="mb-2 text-2xl font-bold tracking-tight text-white">
              Luffy
            </h1>
          </div>
        </div>
        <div
          class="w-full max-w-sm rounded-lg border border-gray-700 bg-[#1f2937] shadow"
        >
          <img
            class="w-full rounded-t-lg"
            src="../assets/imgs/na.png"
            alt="Naruto"
          />
          <div class="p-5">
            <h1 class="mb-2 text-2xl font-bold tracking-tight text-white">
              Naruto
            </h1>
          </div>
        </div>
        <div
          class="w-full max-w-sm rounded-lg border border-gray-700 bg-[#1f2937] shadow"
        >
          <img
            class="w-full rounded-t-lg"
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
    <!-- divider -->
    <div class="divider mx-auto my-16 flex items-center gap-8 px-8">
      <hr class="flex-1 border-t-4 border-white-900" />
      <h2 class="whitespace-nowrap text-4xl font-bold text-white">Songs</h2>
      <hr class="flex-1 border-t-4 border-white-900" />
    </div>
    <!-- songs -->
    <div class="container grid lg:grid-cols-3 gap-4 mx-auto">
      <!-- succeed to fetch the song  -->
      <div
        class="songs rounded-xl p-4 text-center bg-gray-900"
        v-for="song in songs"
        :key="song._id"
      >
        <div class="song">
          <h1 class="text-white mb-4 text-2xl font-bold">{{ song.title }}</h1>
          <img
            class="h-48 mb-4 rounded-lg w-full object-cover"
            :src="song.image"
            :alt="song.title"
          />
          <CustomAudioPlayer class="w-full mb-4 rounded-lg" :src="song.audio" />
        </div>
      </div>
    </div>
  </div>
</template>
