<template>
    <div class=" mt-20" >
        <h3 class="font-bold text-center text-xl">Pricing</h3>
        <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <div class="flex flex-wrap justify-center text-center">
            <div class="basis-full md:basis-1/3 border border-gray-200 dark:border-gray-800 p-4 md:m-2 rounded-md flex flex-col h-full">
                <div class="flex-grow">
                    <h3 class="font-bold text-2xl">Minimal Boilerplate </h3>
                    <span class="text-sm font-normal text-gray-500">(frontend only)</span>
                    <h2 class="text-4xl mt-4 font-bold">34$</h2>
                    <span class="text-sm font-normal text-gray-500">One time payment</span>
                 <ul class="mt-4 text-left text-sm">
                    <li class="mb-2">Connect your preferred database, CMS, backend, API, etc.</li>
                    <li class="mb-2">Great for building a modern frontend application (landing page, blog, etc) with Nuxt.js.</li>
                        <li class="mb-2">Includes Tailwind CSS, Shadcn UI, Nuxt Icons, and other useful tools.</li>
                 </ul>
            
                    </div>
                <div class="flex gap-2 mt-6">
                    <button class="bg-primary w-full hover:bg-primary/80 text-primary-foreground  px-4 py-2 rounded-md">Buy Now</button>
                </div>
            </div>
            <div class="basis-full md:basis-1/3 border border-gray-200 dark:border-gray-800 p-4 md:m-2 rounded-md flex flex-col h-full">
                <div class="flex-grow">
                    <h3 class="font-bold text-2xl">Full-Stack Boilerplate</h3>
                  <span class="text-sm font-normal text-gray-500">(Supabase, Nuxt, Resend, Stripe)</span>
                    <h2 class="text-2xl my-4 font-bold">Coming Soon</h2>
        
                    <p>Great for building a full-stack application with Nuxt.js and Supabase.</p>
                </div>           
                <div class="flex gap-2 mt-6">
                    <input type="text" class="flex-1 p-2 border border-gray-200 dark:border-gray-800 rounded-md" placeholder="Enter your email">
                    <button class="bg-secondary hover:bg-secondary/80  px-4 py-2 rounded-md">Notify Me</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>