<template>
    <div class="border-b border-gray-200 dark:border-gray-800">
    <div class="container max-w-7xl mx-auto">
     <div class="flex relative justify-between items-center p-4" >
        <NuxtLink to="/">
            <h1 class="text-2xl font-bold">Nuxtz</h1>
        </NuxtLink>
        <div class="flex items-center gap-6">
            <NuxtLink to="/" class="flex items-center gap-2">
                Home
            </NuxtLink>
            <a href="#install" class="flex items-center gap-2">
                Get Started
            </a>
            <a href="#faq" class="flex items-center gap-2">
                FAQ
            </a>
            <a href="https://github.com/babakzy/nuxtz" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2">
                <Icon name="lineicons:github" class="w-5 h-5" />
                GitHub
            </a>
            
            <button @click="toggleDark()" class="flex items-center cursor-pointer">
                <Icon v-if="isDark" name="lineicons:sun" class="w-6 h-6 hover:text-yellow-500 cursor-pointer" />
                <Icon v-else name="lineicons:moon-half-right-5" class="w-6 h-6 hover:text-blue-500 cursor-pointer" />
            </button>
        </div>
     </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
