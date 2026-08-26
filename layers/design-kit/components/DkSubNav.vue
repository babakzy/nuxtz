<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(
  defineProps<{
    title: string
    links?: { label: string, href: string }[]
    ctaLabel?: string
    ctaHref?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    links: () => [],
  },
)

const classes = computed(() =>
  cn(
    'dk-frosted sticky top-0 z-40 w-full border-b border-[var(--dk-hairline-soft)]',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <div class="mx-auto flex h-[52px] max-w-store items-center justify-between px-4 md:px-6">
      <p class="dk-tagline truncate text-[var(--dk-ink)]">
        {{ title }}
      </p>
      <div class="flex items-center gap-3 md:gap-4">
        <nav class="hidden items-center gap-5 md:flex">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="dk-caption text-[var(--dk-ink)] transition-opacity hover:opacity-70"
          >
            {{ link.label }}
          </a>
        </nav>
        <slot name="actions" />
        <DkButton
          v-if="ctaLabel && ctaHref"
          :href="ctaHref"
          variant="primary"
          class="!px-4 !py-2 !text-[14px]"
        >
          {{ ctaLabel }}
        </DkButton>
      </div>
    </div>
  </div>
</template>
