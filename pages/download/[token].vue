<template>
  <div class="container mx-auto py-12 px-4 text-center">
    <h1 class="text-3xl font-bold mb-4">Download Your Boilerplate</h1>
    
    <div v-if="loading" class="flex justify-center py-10">
      <div class="animate-spin h-10 w-10 border-4 border-gray-300 rounded-full border-t-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      <p class="font-bold">{{ error.title }}</p>
      <p>{{ error.message }}</p>
    </div>
    
    <div v-else class="max-w-md mx-auto">
      <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
        <p class="font-bold">Your download is ready!</p>
        <p class="mb-4">Thank you for purchasing our {{ productName }}.</p>
        
        <div v-if="isDownloading" class="py-2">
          <p>Your download should start automatically...</p>
          <div class="animate-pulse mt-2">Preparing download...</div>
        </div>
        
        <div v-else>
          <button 
            @click="startDownload" 
            class="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
          >
            Download Now
          </button>
        </div>
      </div>
      
      <div class="mt-8 text-left bg-gray-50 p-4 rounded border border-gray-100">
        <h3 class="font-bold mb-2">Getting Started</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Extract the downloaded zip file</li>
          <li>Open a terminal and navigate to the extracted folder</li>
          <li>Run <code class="bg-gray-100 px-1 rounded">npm install</code> to install dependencies</li>
          <li>Run <code class="bg-gray-100 px-1 rounded">npm run dev</code> to start the development server</li>
          <li>Open <code class="bg-gray-100 px-1 rounded">http://localhost:3000</code> in your browser</li>
        </ol>
      </div>
      
      <p class="mt-8 text-sm text-gray-500">
        Having trouble? Please contact <a href="mailto:support@nuxtz.com" class="text-blue-600 hover:underline">support@nuxtz.com</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Get the token from the route
const route = useRoute()
const token = route.params.token as string

// State management
const loading = ref(true)
const error = ref<{title: string, message: string} | null>(null)
const productName = ref('Nuxt Boilerplate')
const isDownloading = ref(false)

// Start download function
const startDownload = () => {
  isDownloading.value = true
  
  // Create a hidden iframe to trigger the download
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = `/api/download/${token}`
  document.body.appendChild(iframe)
  
  // Clean up iframe after a delay
  setTimeout(() => {
    document.body.removeChild(iframe)
    isDownloading.value = false
  }, 5000)
}

// Validate the token on page load
onMounted(async () => {
  if (!token) {
    error.value = {
      title: 'Invalid Download Link',
      message: 'The download link is invalid or has expired.'
    }
    loading.value = false
    return
  }
  
  try {
    // Check if token is valid by fetching download info
    const response = await fetch(`/api/download-info/${token}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        error.value = {
          title: 'Download Link Not Found',
          message: 'The download link you provided does not exist or has already been used.'
        }
      } else if (response.status === 410) {
        error.value = {
          title: 'Download Link Expired',
          message: 'This download link has expired. Please contact support for assistance.'
        }
      } else {
        error.value = {
          title: 'Download Error',
          message: 'An error occurred while processing your download. Please try again or contact support.'
        }
      }
      loading.value = false
      return
    }
    
    // Get product info from response
    const data = await response.json()
    productName.value = data.productName || 'Nuxt Boilerplate'
    
    // Start download automatically after a short delay
    setTimeout(() => {
      startDownload()
    }, 1000)
    
  } catch (err) {
    console.error('Error validating download token:', err)
    error.value = {
      title: 'Connection Error',
      message: 'Unable to verify your download. Please check your internet connection and try again.'
    }
  } finally {
    loading.value = false
  }
})
</script> 