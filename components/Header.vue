<template>
    <div class="flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm">
        <NuxtLink to="/">
            <h1 class="text-2xl font-bold">Minimalist Nuxt Boilerplate</h1>
        </NuxtLink>
        <div class="flex items-center gap-4">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/contact">Contact</NuxtLink>
            <label class="flex items-center gap-2">
                <span>Dark Mode</span>
                <Switch />
            </label>
        </div>
    </div>
</template>

<script setup>
import { Switch } from '@/components/ui/switch'
</script>

<style lang="scss" scoped>

</style>