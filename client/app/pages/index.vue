<template>
  <div>
    <div class="heroSection flex h-screen items-center justify-center">
      <h1 class="text-5xl font-bold text-blue-900">Spacetoon World</h1>
    </div>
    <div class="py-6">
      <div class=" divider mx-auto my-10 flex items-center gap-8 px-8">
        <hr class="flex-1 border-t-4 border-blue-900" />
        <h2 class="whitespace-nowrap text-4xl font-bold text-blue-900">Our Heros</h2>
        <hr class="flex-1 border-t-4 border-blue-900" />
      </div>
      <div class="ourHeros cards mx-8 mt-8 flex justify-center gap-8">
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

    <div class="divider mx-auto my-16 flex items-center gap-8 px-8">
      <hr class="flex-1 border-t-4 border-blue-900" />
      <h2 class="whitespace-nowrap text-4xl font-bold text-blue-900">Songs</h2>
      <hr class="flex-1 border-t-4 border-blue-900" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
