<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useTemplateRef } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    type?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    modelValue: '',
    placeholder: 'Search',
    type: 'search',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = useTemplateRef('inputRef')

const classes = computed(() =>
  cn(
    'w-full h-11 rounded-[var(--dk-radius-pill)] border border-[var(--dk-hairline-soft)] bg-[var(--dk-canvas)] px-5 py-3 text-[17px] tracking-[-0.374px] text-[var(--dk-ink)] placeholder:text-[var(--dk-ink-muted-48)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--dk-primary-focus)] focus-visible:outline-offset-2',
    props.class,
  ),
)

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <input
    ref="inputRef"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :class="classes"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>
