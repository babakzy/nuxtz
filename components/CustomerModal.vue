<!-- Customer information modal -->
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-all">
              <DialogTitle class="flex flex-col space-y-1.5 p-6">
                <h3 class="text-2xl font-semibold leading-none tracking-tight">Enter Your Information</h3>
              </DialogTitle>

              <div v-if="apiError" class="mx-6 rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
                <p class="font-medium">Error:</p>
                <p>{{ apiError.message }}</p>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4 p-6">
                <div class="space-y-2">
                  <label for="fullName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    v-model="formData.fullName"
                    required
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div class="space-y-2">
                  <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div class="space-y-2">
                  <label for="companyName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Company Name <span class="text-xs text-muted-foreground">(Optional)</span></label>
                  <input
                    type="text"
                    id="companyName"
                    v-model="formData.companyName"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div class="space-y-2">
                  <label for="phoneNumber" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number <span class="text-xs text-muted-foreground">(Optional)</span></label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    v-model="formData.phoneNumber"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div class="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    @click="closeModal"
                    :disabled="loading"
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    {{ loading ? 'Processing...' : 'Proceed to Payment' }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
// No direct Supabase client needed here
// import { useSupabaseClient } from '#imports' 

// Interface for the expected API response
interface CreateCustomerResponse {
  customerId: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'submitted': [success: boolean, error?: { message: string, code?: string }]
}>()

const loading = ref(false)
const apiError = ref<{ message: string, code?: string } | null>(null) // To display API errors
const formData = reactive({
  fullName: '',
  email: '',
  companyName: '',
  phoneNumber: '',
})

// Your Stripe Payment Link URL
const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/test_3cs8zx8oBak73Ju000'

const closeModal = () => {
  if (!loading.value) {
     emit('update:isOpen', false)
     apiError.value = null // Clear errors when closing manually
  }
}

const handleSubmit = async () => {
  loading.value = true
  apiError.value = null // Clear previous errors
  try {
    console.log('[CustomerModal] Attempting to call /api/create-customer'); // Keep this log

    // Call the backend API route
    const { data, error } = await useFetch<CreateCustomerResponse>('/api/create-customer', {
      method: 'POST',
      body: {
          full_name: formData.fullName,
          email: formData.email,
          company_name: formData.companyName || null,
          phone_number: formData.phoneNumber || null,
      }
    })

    // Handle API errors
    if (error.value) {
        console.error('API Error Response:', error.value.data)
        // Use the error message from the API response if available
        const message = error.value.data?.message || error.value.data?.statusMessage || 'Failed to submit information.'
        const code = error.value.data?.data?.code // Get specific code like DUPLICATE_EMAIL
        apiError.value = { message, code }
        throw new Error(message) // Throw to trigger catch block
    }

    if (!data.value?.customerId) {
        apiError.value = { message: 'API did not return a customer ID.' }
        throw new Error('API did not return a customer ID.')
    }

    // Construct the Stripe URL with client_reference_id
    const stripeUrl = `${STRIPE_PAYMENT_LINK_URL}?client_reference_id=${data.value.customerId}`

    // Redirect to Stripe
    window.location.href = stripeUrl

    // Form reset isn't strictly necessary due to redirect
    formData.fullName = ''
    formData.email = ''
    formData.companyName = ''
    formData.phoneNumber = ''

  } catch (err: any) {
    console.error('Error in handleSubmit catch block:', err)
    // Ensure apiError is set if not already by the fetch error handling
    if (!apiError.value) {
        apiError.value = { message: err.message || 'An unexpected error occurred.' }
    }
    emit('submitted', false, apiError.value)
    // Do not close modal on error, let user see the error message
    // closeModal() 
  } finally {
    // Only set loading to false if an error occurred (no redirect)
    if (apiError.value) {
        loading.value = false
    }
  }
}
</script> 