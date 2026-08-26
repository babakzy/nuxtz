<template>
  <div class="min-h-[100dvh] bg-[var(--dk-canvas-parchment)] text-[var(--dk-ink)]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/Toast.vue'
</script>
