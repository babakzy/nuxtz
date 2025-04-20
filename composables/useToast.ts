import { ref } from 'vue'

interface Toast {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const toast = ({ title, description, variant = 'default' }: Toast) => {
    toasts.value.push({ title, description, variant })
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      toasts.value.shift()
    }, 5000)
  }

  return {
    toast,
    toasts
  }
} 