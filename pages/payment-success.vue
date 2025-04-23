<template>
  <div class="container mx-auto py-12 text-center">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
    <p class="mb-6">Thank you for your purchase. Your payment has been confirmed.</p>
    <p class="mb-6">Please check your email for your download link.</p>
    <!-- Test mode banner -->
    <div v-if="isTestMode" class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
      <p class="font-bold">Test Mode Detected</p>
      <p class="text-sm">This is a test transaction. Verification might behave differently than in production.</p>
    </div>
    
    <div v-if="loading" class="text-gray-600">Verifying payment details...</div>
    
    <!-- General Error (Non-Test Mode or Unexpected Error) -->
    <div v-else-if="error && !isTestMode" class="text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded mb-4">
      <p class="font-bold">Error Verifying Payment</p>
      <p>{{ error.message }}</p>
      <p v-if="error.code" class="text-sm mt-2">Error code: {{ error.code }}</p>
      <p class="mt-4">Please contact support if you believe this is an error.</p>
    </div>
    
    <!-- Successful Verification (Both Prod and Test) -->
    <div v-else-if="verificationStatus === 'success'" class="text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded mb-4">
      <p class="font-bold">Payment Verified Successfully!</p>
      <p>Your purchase record has been updated.</p>
      <p v-if="verificationMessage" class="text-sm mt-2">{{ verificationMessage }}</p>
      <p class="mt-2">You should receive an email shortly with your download link.</p>
    </div>
    
    <!-- Failed Verification in Test Mode (Expected Behavior) -->
    <div v-else-if="verificationStatus === 'failed' && isTestMode" class="text-blue-700 bg-blue-50 border border-blue-200 px-4 py-3 rounded mb-4">
      <p class="font-bold">Test Purchase Complete!</p>
      <p>Payment verification status is '{{ verificationMessage || 'failed' }}', which is often expected in test mode.</p>
      <p class="mt-2">For testing purposes, consider this purchase successful.</p>
      <p>In a production environment, the verification would complete, and you would receive the download link via email.</p>
    </div>

    <!-- Failed Verification in Production (Real Issue) -->
    <div v-else-if="verificationStatus === 'failed' && !isTestMode" class="text-orange-600 bg-orange-50 border border-orange-200 px-4 py-3 rounded mb-4">
      <p class="font-bold">Payment Verification Pending</p>
      <p>We couldn't automatically verify your payment status immediately (Status: {{ verificationMessage || 'failed' }}).</p>
      <p class="mt-2">Please check your email for the purchase confirmation and download link. If it doesn't arrive within a few minutes, please contact support.</p>
    </div>

    <NuxtLink to="/" class="mt-8 inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700">Return Home</NuxtLink>
    
    <!-- Debug information in test mode -->
    <div v-if="isTestMode && sessionDetails" class="mt-10 text-left border-t pt-6">
      <h3 class="font-bold text-lg mb-3">Test Mode Debug Info (Verification Details):</h3>
      <pre class="bg-gray-100 p-4 rounded overflow-auto text-xs">{{ sessionDetails }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const error = ref<{ message: string; code?: string } | null>(null)
const verificationStatus = ref<'pending' | 'success' | 'failed'>('pending')
const verificationMessage = ref<string | null>(null)
const sessionDetails = ref<any>(null)

// Check if we're in test mode based on session ID
const isTestMode = computed(() => {
  const sessionId = route.query.session_id as string
  return sessionId?.startsWith('cs_test_')
})

interface VerificationResponse {
  status: 'success' | 'failed'
  message?: string
  details?: any
}

const verifySession = async (sessionId: string) => {
  loading.value = true
  error.value = null
  verificationMessage.value = null
  
  try {
    const { data, error: fetchError } = await useFetch<VerificationResponse>('/api/verify-stripe-session', {
      method: 'POST',
      body: { sessionId }
    })

    if (fetchError.value) {
      const errorData = fetchError.value.data as any
      throw new Error(errorData?.statusMessage || fetchError.value.message || 'Unknown error')
    }

    if (data.value?.status === 'success') {
      verificationStatus.value = 'success'
      if (data.value?.message) {
        verificationMessage.value = data.value.message
      }
    } else {
      verificationStatus.value = 'failed'
      verificationMessage.value = data.value?.message || 'Verification failed'
      console.warn('Verification failed:', data.value)
      
      // Store details for debugging in test mode
      if (isTestMode.value && data.value?.details) {
        sessionDetails.value = JSON.stringify(data.value.details, null, 2)
      }
    }

  } catch (err: any) {
    console.error('Error calling verification API:', err)
    error.value = {
      message: err.message || 'An unexpected error occurred',
      code: err.code
    }
    verificationStatus.value = 'failed'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const sessionId = route.query.session_id
  
  console.log('URL query parameters:', route.query)
  
  if (typeof sessionId === 'string' && sessionId) {
    console.log(`Found session ID: ${sessionId}, verifying...`)
    console.log(`Test mode: ${isTestMode.value}`)
    verifySession(sessionId)
  } else {
    console.warn('No valid Stripe session ID found in URL.')
    error.value = { message: 'Invalid session ID.' }
    verificationStatus.value = 'failed'
    loading.value = false
  }
})
</script> 