<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 px-4 py-8">
    <section class="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-2xl">
      <h2 class="mb-8 text-center text-3xl font-bold text-gray-800">
        Add New Song
      </h2>

      <form @submit.prevent="handleSubmit" autocomplete="off">
        <div class="mb-6">
          <label for="title" class="mb-2 block font-semibold text-gray-800">
            Title
          </label>
          <input
            id="title"
            v-model="form.title"
            name="title"
            type="text"
            required
            minlength="1"
            placeholder="Song title"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <div class="mb-6">
          <label for="image" class="mb-2 block font-semibold text-gray-800">
            Image (cover)
          </label>
          <input
            id="image"
            ref="imageInput"
            name="image"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <div class="mb-6">
          <label for="audio" class="mb-2 block font-semibold text-gray-800">
            Audio file
          </label>
          <input
            id="audio"
            ref="audioInput"
            name="audio"
            type="file"
            accept="audio/*"
            @change="handleAudioChange"
            class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-500"
          />
        </div>

        <!-- Preview Area -->
        <div class="mb-6 min-h-32 rounded border-2 border-dashed border-gray-300 bg-gray-50 p-4" role="region" aria-live="polite">
          <div v-if="imagePreview" class="mb-4">
            <img :src="imagePreview" alt="Image preview" class="max-h-48 max-w-full rounded" />
            <button 
              type="button" 
              @click="removeImage"
              class="mt-2 rounded bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          <div v-if="audioFile">
            <audio :src="audioPreview" controls class="mb-2 w-full"></audio>
            <button 
              type="button" 
              @click="removeAudio"
              class="rounded bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          :class="{ 'opacity-70': isLoading }"
          class="w-full rounded bg-purple-500 py-2 font-semibold text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Adding...' : 'Add Song' }}
        </button>

        <div
          v-if="message"
          :class="{ 'bg-green-100 text-green-800': messageType === 'success', 'bg-red-100 text-red-800': messageType !== 'success' }"
          class="mt-4 rounded px-4 py-3 text-center font-semibold"
          role="alert"
          aria-live="polite"
        >
          {{ message }}
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  title: '',
})

const imageFile = ref<File | null>(null)
const imagePreview = ref('')
const audioFile = ref<File | null>(null)
const audioPreview = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const audioInput = ref<HTMLInputElement | null>(null)
const message = ref('')
const messageType = ref('')
const isLoading = ref(false)

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleAudioChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    audioFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      audioPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imageFile.value = null
  imagePreview.value = ''
  if (imageInput.value) imageInput.value.value = ''
}

const removeAudio = () => {
  audioFile.value = null
  audioPreview.value = ''
  if (audioInput.value) audioInput.value.value = ''
}

const handleSubmit = async () => {
  message.value = ''
  messageType.value = ''

  const title = form.value.title.trim()
  if (!title) {
    message.value = 'Please add a title.'
    messageType.value = 'error'
    return
  }

  isLoading.value = true

  try {
    const formData = new FormData()
    formData.append('title', title)

    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    if (audioFile.value) {
      formData.append('audio', audioFile.value)
    }

    message.value = 'Song added successfully!'
    messageType.value = 'success'

    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error) {
    message.value = 'Failed to add song.'
    messageType.value = 'error'
    console.error('Error adding song:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
