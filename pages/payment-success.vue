<template>
  <div class="container mx-auto py-12 text-center">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
    <p class="mb-6">Thank you for your purchase. Your payment has been confirmed.</p>
    <div v-if="loading" class="text-gray-600">Verifying payment details...</div>
    <div v-else-if="error" class="text-red-600">Error verifying payment: {{ error.message }}</div>
    <div v-else-if="verificationStatus === 'success'" class="text-green-700">Payment verified and record updated.</div>
    <div v-else-if="verificationStatus === 'failed'" class="text-orange-600">Payment verification failed. Please contact support if payment was made.</div>
    <NuxtLink to="/" class="mt-8 inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700">Return Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const error = ref<Error | null>(null)
const verificationStatus = ref<'pending' | 'success' | 'failed'>('pending')

interface VerificationResponse {
  status: 'success' | 'failed'
  message?: string
}

const verifySession = async (sessionId: string) => {
  loading.value = true
  error.value = null
  try {
    // We'll create this API route next
    const { data, error: fetchError } = await useFetch<VerificationResponse>('/api/verify-stripe-session', {
      method: 'POST',
      body: { sessionId }
    })

    if (fetchError.value) throw fetchError.value

    if (data.value?.status === 'success') {
      verificationStatus.value = 'success'
    } else {
      verificationStatus.value = 'failed'
      console.warn('Verification failed:', data.value?.message)
    }

  } catch (err: any) {
    console.error('Error calling verification API:', err)
    error.value = err
    verificationStatus.value = 'failed'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const sessionId = route.query.session_id
  if (typeof sessionId === 'string' && sessionId.startsWith('cs_test')) {
    verifySession(sessionId)
  } else {
    console.warn('No valid Stripe session ID found in URL.')
    error.value = new Error('Invalid session ID.')
    verificationStatus.value = 'failed'
    loading.value = false
  }
})
</script> 