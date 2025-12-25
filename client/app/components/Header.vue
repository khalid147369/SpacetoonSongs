<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
const auth = useAuthStore();
// Use storeToRefs to keep the 'user' reactive
const { user } = storeToRefs(auth);

// Debugging: Let's see what the app actually sees when it loads
onMounted(() => {
  auth.refresh();
});
// mobile
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (typeof window !== 'undefined' && window.document) {
    const body = document.body;
    if (body) {
      if (isMobileMenuOpen.value) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    }
  }
};
</script>
<template>
  <!-- Header with dark-gray background and sticky position -->
  <header class="sticky top-0 z-[9999] bg-dark-gray py-4 shadow-xl">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo/Brand Section -->
      <div class="flex items-center space-x-2">
        <NuxtImg src="/imgs/log.png" format="webp" alt="Spacetoon Logo" class="h-10" />
        <span class="text-xl font-bold text-white tracking-wider"
          >SPACETOON</span
        >
      </div>

      <!-- Hamburger Menu Button (visible on small screens) -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation Links (visible on medium screens and up) -->
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink
          to="/"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/panel"
          v-if="user"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Panel</NuxtLink
        >
        <NuxtLink
          to="/login"
          v-if="!user"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Login</NuxtLink
        >
        <NuxtLink
          to="/register"
          v-if="!user"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Register</NuxtLink
        >
        <button
          v-if="user"
          @click="auth.logout()"
          class="px-3 py-1.5 rounded-lg font-medium text-white bg-vibrant-purple transition-colors duration-200 hover:bg-danger/80"
        >
          Logout
        </button>
      </nav>
    </div>

    <!-- Mobile Navigation Menu (visible when toggled) -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-dark-gray">
      <nav class="flex flex-col items-center space-y-4 py-4">
        <NuxtLink
          to="/"
          @click="toggleMobileMenu"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/panel"
          v-if="user"
          @click="toggleMobileMenu"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Panel</NuxtLink
        >
        <NuxtLink
          to="/login"
          v-if="!user"
          @click="toggleMobileMenu"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Login</NuxtLink
        >
        <NuxtLink
          to="/register"
          v-if="!user"
          @click="toggleMobileMenu"
          class="text-white font-medium transition-colors duration-200 hover:text-vibrant-purple"
          >Register</NuxtLink
        >
        <button
          v-if="user"
          @click="
            auth.logout();
            toggleMobileMenu();
          "
          class="px-3 py-1.5 rounded-lg font-medium text-white bg-vibrant-purple transition-colors duration-200 hover:bg-vibrant-purple/80"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>
