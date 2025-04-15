<template>
    <Header />
    <div class="container max-w-7xl mx-auto px-4">
        <slot />
    </div>
    <Footer />
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue'
</script>