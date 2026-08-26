<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../utils/cn'

type DkButtonVariant =
  | 'primary'
  | 'secondary'
  | 'dark-utility'
  | 'pearl'
  | 'store-hero'
  | 'icon-circular'
  | 'link'
  | 'link-on-dark'

type DkButtonSize = 'default' | 'sm' | 'lg' | 'icon'

const props = withDefaults(
  defineProps<{
    variant?: DkButtonVariant
    size?: DkButtonSize
    href?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'primary',
    size: 'default',
    type: 'button',
    disabled: false,
  },
)

const variantClass: Record<DkButtonVariant, string> = {
  primary:
    'bg-[var(--dk-primary)] text-[var(--dk-on-primary)] rounded-[var(--dk-radius-pill)] px-[22px] py-[11px] text-[17px] font-normal tracking-[-0.374px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--dk-primary-focus)] focus-visible:outline-offset-2',
  secondary:
    'bg-transparent text-[var(--dk-primary)] border border-[var(--dk-primary)] rounded-[var(--dk-radius-pill)] px-[22px] py-[11px] text-[17px] font-normal tracking-[-0.374px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--dk-primary-focus)] focus-visible:outline-offset-2',
  'dark-utility':
    'bg-[var(--dk-ink)] text-[var(--dk-on-primary)] rounded-[var(--dk-radius-sm)] px-[15px] py-2 text-[14px] font-normal tracking-[-0.224px]',
  pearl:
    'bg-[var(--dk-surface-pearl)] text-[var(--dk-ink-muted-80)] border-[3px] border-[var(--dk-divider-soft)] rounded-[var(--dk-radius-md)] px-[14px] py-2 text-[14px] font-normal tracking-[-0.224px]',
  'store-hero':
    'bg-[var(--dk-primary)] text-[var(--dk-on-primary)] rounded-[var(--dk-radius-pill)] px-7 py-[14px] text-[18px] font-light leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--dk-primary-focus)] focus-visible:outline-offset-2',
  'icon-circular':
    'bg-[var(--dk-surface-chip)] text-[var(--dk-ink)] rounded-full size-11 inline-flex items-center justify-center p-0',
  link:
    'bg-transparent text-[var(--dk-primary)] text-[17px] font-normal tracking-[-0.374px] p-0 rounded-none',
  'link-on-dark':
    'bg-transparent text-[var(--dk-primary-on-dark)] text-[17px] font-normal tracking-[-0.374px] p-0 rounded-none',
}

const sizeClass: Record<DkButtonSize, string> = {
  default: '',
  sm: 'text-[14px] px-4 py-2',
  lg: '',
  icon: 'size-11 p-0',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-transform duration-150 ease-out active:scale-[0.95] disabled:pointer-events-none disabled:opacity-50',
    variantClass[props.variant],
    props.size !== 'default' && sizeClass[props.size],
    props.class,
  ),
)

const isLink = computed(() => Boolean(props.href))
</script>

<template>
  <NuxtLink
    v-if="isLink && href?.startsWith('/')"
    :to="href"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="isLink"
    :href="href"
    :class="classes"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </button>
</template>
