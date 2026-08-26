<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(
  defineProps<{
    onDark?: boolean
    class?: HTMLAttributes['class']
    href?: string
  }>(),
  {
    onDark: false,
  },
)

const classes = computed(() =>
  cn(
    'dk-body underline-offset-2 hover:underline transition-opacity active:scale-[0.98]',
    props.onDark
      ? 'text-[var(--dk-primary-on-dark)]'
      : 'text-[var(--dk-primary)]',
    props.class,
  ),
)
</script>

<template>
  <NuxtLink
    v-if="href?.startsWith('/')"
    :to="href"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
  >
    <slot />
  </a>
  <span
    v-else
    :class="classes"
  >
    <slot />
  </span>
</template>
