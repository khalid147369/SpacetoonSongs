<template>
  <div class="bg-gray-800 text-white rounded-lg p-4 flex items-center">
    <button
      @click="togglePlay"
      class="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 focus:outline-none mr-4"
    >
      <svg
        v-if="!isPlaying"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M4.516 2.84A.5.5 0 0 0 4 3.268v13.464a.5.5 0 0 0 .516.428l11.484-6.732a.5.5 0 0 0 0-.856L4.516 2.84z"
        ></path>
      </svg>
      <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"></path>
      </svg>
    </button>
    <div class="flex-grow">
      <div
        class="relative h-2 bg-gray-600 rounded-full"
        @click="seek"
        ref="progressBar"
      >
        <div
          class="absolute top-0 left-0 h-2 bg-purple-500 rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
        <div class="absolute top-0 h-2 w-full">
          <input
            type="range"
            min="0"
            max="100"
            v-model="progress"
            @input="seek"
            class="w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <div class="flex justify-between text-xs mt-1">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>
    <audio
      ref="audioPlayer"
      :src="src"
      @timeupdate="updateProgress"
      @loadedmetadata="getDuration"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const progressBar = ref<HTMLElement | null>(null);

const togglePlay = () => {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause();
    } else {
      audioPlayer.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

const updateProgress = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
    progress.value =
      (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
  }
};

const getDuration = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration;
  }
};

const seek = (event: MouseEvent | Event) => {
  if (
    audioPlayer.value &&
    (event.target instanceof HTMLInputElement || progressBar.value)
  ) {
    let percentage;
    if (event.target instanceof HTMLInputElement) {
      percentage = Number(event.target.value);
    } else {
      const progressBarRect = progressBar.value!.getBoundingClientRect();
      const clickPosition =
        (event as MouseEvent).clientX - progressBarRect.left;
      percentage = (clickPosition / progressBarRect.width) * 100;
    }

    const time = (audioPlayer.value.duration / 100) * percentage;
    audioPlayer.value.currentTime = time;
  }
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

onMounted(() => {
  // We can get duration once metadata is loaded
});
</script>

<style scoped>
/* Using TailwindCSS classes in the template */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #9333ea; /* purple-600 */
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #9333ea; /* purple-600 */
  border-radius: 50%;
  cursor: pointer;
}
</style>
