<script setup lang="ts">
/**
 * Scroll reveal — opacity/transform only.
 * Honors prefers-reduced-motion via CSS `.dk-reveal` override.
 */
import type { HTMLAttributes } from 'vue'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(
  defineProps<{
    delay?: number
    class?: HTMLAttributes['class']
    as?: string
  }>(),
  {
    delay: 0,
    as: 'div',
  },
)

const el = useTemplateRef('el')
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  observer.observe(el.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="dk-reveal"
    :class="cn(
      'transition-[opacity,transform] duration-700 ease-out',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      props.class,
    )"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </component>
</template>
