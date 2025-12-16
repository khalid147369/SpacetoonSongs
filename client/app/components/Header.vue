<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
const auth = useAuthStore();
</script>
<template>
  <!-- Header with dark-gray background and sticky position -->
  <header class="sticky top-0 z-[9999] bg-dark-gray py-4 shadow-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo/Brand Section -->
      <div class="flex items-center space-x-2">
        <img src="../assets/imgs/log.png" alt="Spacetoon Logo" class="h-10" />
        <span class="text-xl font-bold text-white tracking-wider">SPACETOON</span>
      </div>

      <!-- Navigation Links -->
      <nav class="flex items-center space-x-6">
        <NuxtLink
          to="/"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/panel"
          v-if="auth.user"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Panel</NuxtLink
        >
        <NuxtLink
          to="/login"
          v-if="!auth.user"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Login</NuxtLink
        >
        <NuxtLink
          to="/register"
          v-if="!auth.user"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Register</NuxtLink
        >
        <button
          v-if="auth.user"
          @click="auth.logout()"
          class="px-3 py-1.5 rounded-lg font-medium text-white bg-vibrant-purple transition-colors duration-200 hover:bg-vibrant-purple/80"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>
