<template>
    <section  class=" mt-20">
        <h3 class="font-bold text-center text-xl">Pricing</h3>
        <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <div id="pricing" class="flex flex-wrap justify-center text-center mt-4">
            <div
                class="basis-full my-2 md:basis-1/3 border border-gray-200 dark:border-gray-800 p-4 md:p-8 md:m-2 rounded-md flex flex-col h-full">
                <div class="flex-grow">
                    <h3 class="font-bold text-2xl">Minimal Boilerplate </h3>
                    <span class="text-sm font-normal text-gray-500">(frontend only)</span>
                    <h2 class="text-4xl mt-4 font-bold">45$</h2>
                    <span class="text-sm font-normal text-gray-500">One time payment</span>
                    <ul class="mt-4 text-left text-sm">
                        <li class="mb-2">Connect your preferred database, CMS, backend, API, etc.</li>
                        <li class="mb-2">Great for building a modern frontend application (landing page, blog, etc) with
                            Nuxt.js.</li>
                        <li class="mb-2">Includes Tailwind CSS, Shadcn UI, Nuxt Icons, and other useful tools.</li>
                    </ul>
                </div>
                <div class="flex gap-2 mt-6">
                    <Button
                        class="w-full py-4"
                        @click="showCustomerModal = true">Buy
                        Now</Button>
                </div>
            </div>
            <div
                class="basis-full my-2 md:basis-1/3 border border-gray-200 dark:border-gray-800 p-4 md:p-8 md:m-2 rounded-md flex flex-col h-full">
                <div class="flex-grow">
                    <h3 class="font-bold text-2xl">Full-Stack Boilerplate</h3>
                    <span class="text-sm font-normal text-gray-500">(Supabase, Nuxt, Resend, Stripe)</span>
                    <h2 class="text-2xl my-4 font-bold">Coming Soon</h2>

                    <p>Great for building a full-stack application with Nuxt.js and Supabase.</p>
                </div>
                <div class="flex gap-2 mt-6">
                    <input
                        v-model="notifyEmail"
                        type="email"
                        class="flex-1 h-10 px-4 border border-gray-200 dark:border-gray-800 rounded-md"
                        placeholder="Enter your email">
                    <Button
                        variant="secondary"
                        class="h-10 hover:bg-gray-200"
                        @click="handleNotifyMe"
                    >Notify Me</Button>
                </div>
            </div>
        </div>
        <CustomerModal
            v-model:is-open="showCustomerModal"
            @submitted="handleSubmitted"
        />
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'

const showCustomerModal = ref(false)
const notifyEmail = ref('') // Ref for the email input
const { toast } = useToast()

const handleSubmitted = (success: boolean) => {
  if (success) {
    toast({
      title: 'Success',
      description: 'Thank you for your purchase! We will contact you shortly.',
    })
  } else {
    toast({
      title: 'Error',
      description: 'There was an error processing your request. Please try again.',
      variant: 'destructive',
    })
  }
}

// Function to handle "Notify Me" click
const handleNotifyMe = async () => {
    const email = notifyEmail.value.trim()
    // Basic email validation (can potentially be removed if backend handles it robustly)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        toast({
            title: 'Invalid Email',
            description: 'Please enter a valid email address.',
            variant: 'destructive',
        })
        return;
    }

    try {
        // Call the backend API endpoint instead of Supabase directly
        await $fetch('/api/add-to-waitlist', {
            method: 'POST',
            body: { email: email }
        })

        // API Success
        toast({
            title: 'Success!',
            description: 'You\'ve been added to the waiting list.',
        })
        notifyEmail.value = '' // Clear the input field on success

    } catch (error: any) {
        console.error('Error calling /api/add-to-waitlist:', error)

        // Default error messages
        let title = 'Error'
        let description = 'Could not add email to the waiting list. Please try again.'

        // If the error comes from our backend API (has statusCode and data)
        // use the message provided by the backend.
        if (error.data && error.statusCode) {
            title = 'Submission Error' // Generic title for backend errors
            description = error.data.message || error.statusMessage || description // Use backend message
        }

        toast({
            title: title,
            description: description,
            variant: 'destructive',
        })
    }
}
</script>

<style lang="scss" scoped></style>