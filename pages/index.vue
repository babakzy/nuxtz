<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold">Minimalist Nuxt Boilerplate</h1>
        <p class="text-lg text-gray-500 mt-4">This is a minimalistic Nuxt boilerplate that includes <span class="underline">Tailwind CSS</span>, <span class="underline">Shadcn UI</span>, and <span class="underline">Nuxt Icons</span>.</p>
        <p class="text-lg text-gray-500">It includes basic setup for routing, components, and other almost neccessary things for every real-world Nuxt project.</p>
        <Button class="mt-4">Click me</Button>
        <code class="mt-4">
            <pre>
                <code>
                    <span class="text-sm text-gray-500">npm install</span>
                </code>
            </pre>
        </code>
    </div>
</template>

<script setup>
import { Button } from "@/components/ui/button"
</script>

<style lang="scss" scoped>

</style>