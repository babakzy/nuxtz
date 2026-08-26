<template>
  <section id="features" class="mx-auto max-w-store px-4 py-16 md:py-20">
    <h2 class="dk-display-md text-center text-[var(--dk-ink)]">
      What's included
    </h2>
    <p class="dk-body mx-auto mt-4 mb-10 max-w-[55ch] text-center text-[var(--dk-ink-muted-80)]">
      Common Nuxt 4 tooling and project structure, configured so you can start from a working base instead of wiring everything yourself.
    </p>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <component
        :is="feature.href ? 'a' : 'div'"
        v-for="feature in highlightedFeatures"
        :key="feature.title"
        :href="feature.href"
        :target="feature.href ? '_blank' : undefined"
        :rel="feature.href ? 'noopener noreferrer' : undefined"
        class="feature-card lg:col-span-2"
      >
        <Icon
          :name="feature.icon"
          class="mb-2 text-3xl text-[var(--dk-primary)]"
        />
        <h3 class="dk-body-strong text-[var(--dk-ink)]">
          {{ feature.title }}
        </h3>
        <p class="dk-caption mt-1 flex-1 text-[var(--dk-ink-muted-80)]">
          {{ feature.description }}
        </p>
      </component>

      <div
        v-for="feature in features"
        :key="feature.title"
        class="feature-card"
      >
        <Icon
          :name="feature.icon"
          class="mb-2 text-3xl text-[var(--dk-primary)]"
        />
        <h3 class="dk-body-strong text-[var(--dk-ink)]">
          {{ feature.title }}
        </h3>
        <p class="dk-caption mt-1 flex-1 text-[var(--dk-ink-muted-80)]">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const highlightedFeatures = [
  {
    title: 'Skills for AI',
    icon: 'ph:sparkle',
    description: 'Agent skills and Cursor rules in .agents/skills.',
    href: 'https://github.com/babakzy/nuxtz/tree/main/.agents/skills',
  },
  {
    title: 'DESIGN-KIT.md',
    icon: 'ph:swatches',
    description: 'Design token spec. Implemented in layers/design-kit.',
    href: 'https://github.com/babakzy/nuxtz/blob/main/DESIGN-KIT.md',
  },
]

const features = [
  {
    title: 'Tailwind CSS',
    icon: 'ph:paint-brush',
    description: 'Utility-first CSS framework for rapid UI development.',
  },
  {
    title: 'Shadcn UI',
    icon: 'ph:squares-four',
    description: 'A collection of Vue components you can customize.',
  },
  {
    title: 'Nuxt Icons',
    icon: 'ph:shapes',
    description: 'Iconify icons with a simple Icon component.',
  },
  {
    title: 'Dark mode',
    icon: 'ph:moon',
    description: 'Light and dark themes with VueUse.',
  },
  {
    title: 'Nuxt Image',
    icon: 'ph:image',
    description: 'Optimized image handling for faster loading.',
  },
  {
    title: 'Nuxt directories',
    icon: 'ph:folder-simple',
    description: 'Standard pages, components, and composables layout.',
  },
  {
    title: 'Landing page',
    icon: 'ph:layout',
    description: 'A simple starting page for marketing sites.',
  },
  {
    title: 'VueUse',
    icon: 'ph:puzzle-piece',
    description: 'Composition utilities for Vue applications.',
  },
]
</script>

<style scoped>
.feature-card {
  @apply flex h-full flex-col rounded-[var(--dk-radius-lg)] border border-[var(--dk-hairline)] bg-[var(--dk-canvas)] p-5;
}

a.feature-card {
  @apply transition-opacity hover:opacity-80;
}
</style>
