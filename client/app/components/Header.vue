<template>
  <header class="sticky top-0 z-[9999] bg-blue-900 py-1 shadow-lg">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-8 px-8">
      <div>
        <div class="flex items-center justify-center">
          <img src="../assets/imgs/log.png" alt="Logo" class="h-16" />
        </div>
      </div>

      <nav class="flex flex-1 items-center justify-center gap-8">
        <NuxtLink
          to="/"
          class="rounded px-4 py-2 font-medium text-white transition-all hover:bg-green-500/20 hover:text-green-400"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/panel"
          class="rounded px-4 py-2 font-medium text-white transition-all hover:bg-green-500/20 hover:text-green-400"
          >Panel</NuxtLink
        >
        <NuxtLink
          to="/login"
          class="rounded px-4 py-2 font-medium text-white transition-all hover:bg-green-500/20 hover:text-green-400"
          >Login</NuxtLink
        >
        <NuxtLink
          to="/register"
          class="rounded px-4 py-2 font-medium text-white transition-all hover:bg-green-500/20 hover:text-green-400"
          >Register</NuxtLink
        >
        <button
          class="rounded px-4 py-2 font-medium text-white transition-all hover:bg-green-500/20 hover:text-green-400"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
