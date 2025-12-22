<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

useHead({
  title: "Login",
});

const auth = useAuthStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", email.value);

    await auth.login(email.value, password.value);

    console.log("=== LOGIN SUCCESS ===");
    console.log("Token after login:", !!auth.accessToken?.value);
    console.log("User after login:", auth.user?.value);

    // show success message
    successMessage.value = "Login successful! Redirecting...";

    // Wait a bit to ensure cookies are set
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("=== NAVIGATING TO HOME ===");
    console.log("Token before navigation:", !!auth.accessToken?.value);

    // Navigate to home
    await navigateTo("/");
  } catch (error) {
    console.error("=== LOGIN FAILED ===", error);
    errorMessage.value = (error as any).data?.message || "Login failed";
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="flex min-h-screen items-center justify-center bg-deep-black p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
      <h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Login</h1>
      <div
        v-if="errorMessage"
        class="mb-4 rounded bg-red-100 p-3 text-center text-red-700 border border-red-400"
      >
        {{ errorMessage }}
      </div>
      <div
        v-if="successMessage"
        class="mb-4 rounded bg-green-100 p-3 text-center text-green-700 border border-green-400"
      >
        {{ successMessage }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="mb-2 block font-semibold text-gray-800">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="mb-2 block font-semibold text-gray-800">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            required
            placeholder="password"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          :class="{ 'opacity-70': isLoading }"
          class="mt-2 w-full rounded bg-dark-gray py-2 font-semibold text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Login..." : "Login" }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        You don't have an account?
        <NuxtLink
          to="/register"
          class="text-green-500 transition-colors hover:text-green-600"
        >
          Register here.
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
