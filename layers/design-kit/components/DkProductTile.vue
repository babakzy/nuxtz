<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../utils/cn'

type TileTone = 'light' | 'parchment' | 'dark' | 'dark-2' | 'dark-3'

const props = withDefaults(
  defineProps<{
    tone?: TileTone
    align?: 'center' | 'start'
    padded?: boolean
    wide?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    tone: 'light',
    align: 'center',
    padded: true,
    wide: false,
  },
)

const toneClass: Record<TileTone, string> = {
  light: 'bg-[var(--dk-canvas)] text-[var(--dk-ink)]',
  parchment: 'bg-[var(--dk-canvas-parchment)] text-[var(--dk-ink)]',
  dark: 'bg-[var(--dk-surface-tile-1)] text-[var(--dk-body-on-dark)]',
  'dark-2': 'bg-[var(--dk-surface-tile-2)] text-[var(--dk-body-on-dark)]',
  'dark-3': 'bg-[var(--dk-surface-tile-3)] text-[var(--dk-body-on-dark)]',
}

const isDark = computed(() => props.tone.startsWith('dark'))

const classes = computed(() =>
  cn(
    'w-full rounded-none',
    toneClass[props.tone],
    props.padded && 'px-6 py-12 md:px-12 md:py-[var(--dk-space-section)]',
    props.align === 'center' && 'text-center',
    props.align === 'start' && 'text-left',
    props.class,
  ),
)

defineExpose({ isDark })
</script>

<template>
  <section :class="classes" :data-dk-tone="tone">
    <div
      class="mx-auto w-full"
      :class="[
        wide ? 'max-w-store' : 'max-w-content',
        align === 'center' && 'flex flex-col items-center',
      ]"
    >
      <slot :is-dark="isDark" />
    </div>
  </section>
</template>
