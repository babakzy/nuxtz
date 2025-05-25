<template>
    <div class="flex flex-col items-center justify-center mt-20">
        <h3
            class="text-sm mb-3 inline-block px-3 py-1 rounded-full bg-gradient-to-br from-green-700 to-lime-700 text-white">
            Great for coding with AI</h3>
        <h1 class="text-5xl font-bold">Minimal Nuxt Boilerplate</h1>
        <p class="text-lg text-gray-600 dark:text-gray-200 mt-4">This is a minimalistic Nuxt boilerplate that includes
            <span class="underline">Tailwind CSS</span>, <span class="underline">Shadcn UI</span>, and <span
                class="underline">Nuxt Icons</span>.</p>
        <p class="text-lg text-gray-600 dark:text-gray-200">It includes basic setup for routing, components, and other
            almost neccessary things for every real-world Nuxt project.</p>
<div class="flex gap-2 mt-4">
    <Button variant="outline" @click="goToDemo">See Demo</Button>
    <a href="#pricing">
        <Button>Start Now</Button>
    </a>
</div>
        <!-- <code class="mt-4 p-4  rounded-md border border-gray-200 dark:border-gray-800">
                   git clone https://github.com/shadcn-ui/ui.git
        </code> -->
    </div>
   
    <Options />
    <About />
    <Pricing />


    <FAQ />
</template>

<script setup>
import { Button } from "@/components/ui/button"
function goToDemo() {
    window.open("https://nuxtz-demo.vercel.app/", "_blank")
}
</script>

<style lang="scss" scoped></style>