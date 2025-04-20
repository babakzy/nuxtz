<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtLayout>
      <main class="">
        <NuxtPage />
      </main>
    </NuxtLayout>
    <Toast />
  </div>
</template>

<script setup>
import Toast from '@/components/Toast.vue'
</script>

<style>
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}

body {
  @apply bg-background text-foreground;
}
</style>
