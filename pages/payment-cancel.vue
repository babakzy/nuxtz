<template>
  <div class="container mx-auto py-12 text-center">
    <h1 class="text-3xl font-bold text-orange-600 mb-4">Payment Cancelled</h1>
    <p class="mb-6">Your payment process was cancelled or encountered an issue. You have not been charged.</p>
    <p class="mb-6">If you'd like to try again, please return to the pricing page.</p>
    <NuxtLink to="/" class="mt-8 inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700">Return Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
// No specific logic needed for cancellation page usually
</script> 