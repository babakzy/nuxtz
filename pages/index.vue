<template>
  <div class="flex flex-col items-center justify-center mt-20">
    <h3
      class="text-sm mb-3 inline-block px-3 py-1 rounded-full bg-gradient-to-br from-green-700 to-lime-700 text-white">
      Free &amp; Open Source
    </h3>
    <h1 class="text-5xl font-bold text-center">Minimal Nuxt Boilerplate</h1>
    <p class="text-lg text-gray-600 dark:text-gray-200 mt-4 text-center max-w-2xl">
      A free Nuxt 4 starter with
      <span class="underline">Tailwind CSS</span>,
      <span class="underline">Shadcn UI</span>, and
      <span class="underline">Nuxt Icons</span>.
    </p>
    <p class="text-lg text-gray-600 dark:text-gray-200 text-center max-w-2xl">
      Includes routing, components, dark mode, Cursor rules, and everything you need to ship a real-world Nuxt project.
    </p>
    <div class="flex gap-2 mt-4">
      <Button variant="outline" @click="goToDemo">See Demo</Button>
      <a href="#install">
        <Button>Get Started</Button>
      </a>
    </div>
  </div>

  <InstallGuide />
  <Options />
  <About />
  <FAQ />
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

useSeoMeta({
  title: 'Nuxtz — Free Nuxt 4 Boilerplate with Tailwind & Shadcn UI',
  description: 'Clone Nuxtz for free — a modern Nuxt 4 starter with Tailwind CSS, Shadcn UI, Nuxt Icons, dark mode, and Cursor rules for AI-assisted development.',
  ogTitle: 'Nuxtz — Free Nuxt 4 Boilerplate',
  ogDescription: 'Free and open-source Nuxt 4 starter template. Clone from GitHub, run npm install, and start building.',
  ogUrl: 'https://nuxtz.vercel.app',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nuxtz — Free Nuxt 4 Boilerplate',
  twitterDescription: 'Clone, install, and ship faster with a modern Nuxt 4 starter template.',
})

function goToDemo() {
  window.open('https://nuxtz-demo.vercel.app/', '_blank')
}
</script>
