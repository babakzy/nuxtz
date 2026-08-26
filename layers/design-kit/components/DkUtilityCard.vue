<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = defineProps<{
  title: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  href?: string
  linkLabel?: string
  class?: HTMLAttributes['class']
}>()

const classes = computed(() =>
  cn(
    'flex flex-col bg-[var(--dk-canvas)] border border-[var(--dk-hairline)] rounded-[var(--dk-radius-lg)] p-6 text-left',
    props.class,
  ),
)
</script>

<template>
  <article :class="classes">
    <div
      v-if="imageSrc"
      class="mb-4 aspect-square overflow-hidden rounded-[var(--dk-radius-sm)] bg-[var(--dk-canvas-parchment)]"
    >
      <NuxtImg
        :src="imageSrc"
        :alt="imageAlt || title"
        class="size-full object-cover"
        loading="lazy"
      />
    </div>
    <h3 class="dk-body-strong text-[var(--dk-ink)]">
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="dk-body mt-1 text-[var(--dk-ink-muted-80)]"
    >
      {{ description }}
    </p>
    <DkButton
      v-if="href"
      :href="href"
      variant="link"
      class="mt-3 self-start"
    >
      {{ linkLabel || 'Learn more' }}
    </DkButton>
  </article>
</template>
