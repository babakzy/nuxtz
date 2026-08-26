<template>
  <header>
    <DkSubNav
      title="Nuxtz"
      :links="subNavItems"
      cta-label="Get Started"
      cta-href="#install"
    >
      <template #actions>
        <a
          href="https://github.com/babakzy/nuxtz"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-[var(--dk-ink-muted-80)] transition-opacity hover:text-[var(--dk-primary)]"
          aria-label="GitHub repository"
        >
          <Icon name="lineicons:github" class="size-4" />
          <span class="dk-caption hidden sm:inline">GitHub</span>
        </a>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center text-[var(--dk-ink-muted-80)] transition-opacity hover:text-[var(--dk-primary)] active:scale-95"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDark()"
        >
          <Icon
            v-if="isDark"
            name="lineicons:sun"
            class="size-4"
          />
          <Icon
            v-else
            name="lineicons:moon-half-right-5"
            class="size-4"
          />
        </button>
      </template>
    </DkSubNav>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const subNavItems = [
  { label: 'Features', href: '#features' },
  { label: 'Install', href: '#install' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]
</script>
