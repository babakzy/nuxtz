<template>
  <section class="faq-section flex flex-wrap justify-center mt-20">
    <div class="basis-full md:basis-1/2">
        <h2 class="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <p class="text-gray-600 dark:text-gray-400">If you have any questions, please feel free to ask me personally.</p>
        <div class="flex gap-3 items-center mt-6">
          <img src="/images/babakzy.jpg" class="w-16 h-16 rounded-full" />
          <div>
            <h3 class="text-lg font-semibold">Babak Sadeghzadeh</h3>
            <!-- <p class="text-sm text-gray-600 dark:text-gray-400">Maker of Nuxtz Boilerplate</p> -->
            <div class="flex gap-3 mt-2">
              <a href="https://babakzy.com" target="_blank" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="ph:globe" class="w-5 h-5" />
              </a>
              <a href="https://x.com/babakzy" target="_blank" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="lineicons:x" class="w-5 h-5" />
              </a>
              <a href="https://github.com/babakzy" target="_blank" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="lineicons:github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
    </div>
    <div class="basis-full md:basis-1/2">
        <div class="space-y-6">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <button 
          class="w-full flex justify-between items-center text-left"
          @click="toggleFAQ(index)"
        >
          <h3 class="text-lg font-semibold">{{ faq.question }}</h3>
          <svg 
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': openIndex === index }"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[500px] opacity-100"
          leave-from-class="max-h-[500px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <p v-show="openIndex === index" class="text-gray-600 mt-2 overflow-hidden">{{ faq.answer }}</p>
        </transition>
      </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FAQ',
  data() {
    return {
      openIndex: null as number | null,
      faqs: [
        {
          question: 'What technologies are included in this boilerplate?',
          answer: 'This boilerplate includes Nuxt.js, Vue 3, TypeScript, and TailwindCSS, providing a modern and robust foundation for your web applications.'
        },
        {
          question: 'How do I get started with development?',
          answer: 'After cloning the repository, run `npm install` to install dependencies, then `npm run dev` to start the development server. The application will be available at localhost:3000.'
        },
        {
          question: 'Is this boilerplate suitable for production use?',
          answer: 'Yes, this boilerplate follows best practices and includes optimizations for production deployment. Use `npm run build` to create a production build.'
        },
        {
          question: 'Can I customize the included features?',
          answer: 'Absolutely! The boilerplate is designed to be modular and extensible. You can easily add or remove features by modifying the configuration files and installing additional dependencies.'
        },
        {
          question: 'Where can I find documentation for the included technologies?',
          answer: 'You can find documentation at nuxt.com for Nuxt.js, vuejs.org for Vue.js, typescriptlang.org for TypeScript, and tailwindcss.com for TailwindCSS.'
        }
      ]
    }
  },
  methods: {
    toggleFAQ(index: number) {
      this.openIndex = this.openIndex === index ? null : index
    }
  }
})
</script>

<style scoped>

.faq-item {
  @apply bg-white p-6 rounded-lg border border-gray-200 dark:border-gray-800;
}
</style> 