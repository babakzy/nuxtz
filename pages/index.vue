<template>
  <div>
    <section class="flex min-h-[min(100dvh,720px)] flex-col items-center justify-center px-4 pt-16 text-center md:pt-20">
      <DkReveal class="flex max-w-2xl flex-col items-center">
        <p class="dk-caption-strong mb-3 rounded-[var(--dk-radius-pill)] bg-[var(--dk-canvas-parchment)] px-3 py-1 text-[var(--dk-ink-muted-80)]">
          Free and open source
        </p>
        <h1 class="dk-display-lg text-[var(--dk-ink)]">
          Minimal Nuxt Boilerplate
        </h1>
        <p class="dk-body mt-4 text-[var(--dk-ink-muted-80)]">
          A Nuxt 4 starter with Tailwind CSS, Shadcn UI, Nuxt Icons, and Cursor rules.
        </p>
        <p class="dk-body mt-2 text-[var(--dk-ink-muted-80)]">
          Includes routing, components, dark mode, and a design-kit layer.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <DkButton href="#install" variant="primary">
            Get Started
          </DkButton>
          <DkButton
            href="https://nuxtz-demo.vercel.app/"
            variant="secondary"
          >
            See Demo
          </DkButton>
        </div>
      </DkReveal>
    </section>

    <Options />
    <InstallGuide />
    <About />
    <FAQ />
  </div>
</template>

<script setup lang="ts">
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
</script>
