<script setup lang="ts">
  useHead({
  title: "Register",
});
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
const auth = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const form = ref({
  username: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    await auth.register(
      form.value.username,
      form.value.email,
      form.value.password
    );
    // show success message
    successMessage.value = "Regestired successfully! Redirecting...";
    // wait 2 sec then go home
    setTimeout(async () => {
      await navigateTo("/");
    }, 2000);
  } catch (error) {
    errorMessage.value = (error as any).data.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div
    class="flex min-h-screen items-center justify-center bg-deep-black p-4"
  >
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
      <h1 class="mb-6 text-center text-3xl font-bold text-gray-800">
        Create Account
      </h1>
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
          <label for="username" class="mb-2 block font-semibold text-gray-800">
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            name="username"
            type="text"
            required
            minlength="3"
            placeholder="your username"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="mb-2 block font-semibold text-gray-800">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
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
            v-model="form.password"
            name="password"
            type="password"
            required
            minlength="6"
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
          {{ isLoading ? "Creating..." : "Create Account" }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        You have an account?
        <NuxtLink
          to="/login"
          class="text-green-500 transition-colors hover:text-green-600"
        >
          Login here.
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
