<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
      <h1 class="mb-6 text-center text-3xl font-bold text-gray-800">
        Login
      </h1>
      <form @submit.prevent="handleSubmit">
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
            placeholder="password"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          :class="{ 'opacity-70': isLoading }"
          class="mt-2 w-full rounded bg-purple-500 py-2 font-semibold text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        You don't have an account?
        <NuxtLink to="/register" class="text-green-500 transition-colors hover:text-green-600">
          Register here.
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
  } finally {
    isLoading.value = false
  }
}
</script>
