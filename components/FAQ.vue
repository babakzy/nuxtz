<template>
  <section  class="faq-section flex flex-wrap justify-center mt-20">
    <div  class="basis-full md:basis-1/2 md:pr-4">
        <h2 class="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
       <h1 class="text-2xl font-bold">What is Nuxt Boilerplate?</h1>
        <p class="">Nuxtz is a boilerplate for Nuxt.js. It is the same Nuxt project but with some popular configurations and features that are used to create a modern and efficient web application faster and easier without the need to start from scratch and configure everything from scratch.</p>
      
        <p class="my-6">If you have any questions, please feel free to ask me (<a href="https://babakzy.com" class="text-blue-500 hover:text-blue-700">Babak Sadeghzadeh</a>) personally.</p>
     
    </div>
    <div id="faq" class="basis-full md:basis-1/2">
        <div class="space-y-4">
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
          <p v-show="openIndex === index" class="text-gray-600 dark:text-gray-400 mt-2 overflow-hidden">{{ faq.answer }}</p>
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
      faqs: [  {
          question: 'What is the benefit of using this boilerplate?',
          answer: 'The benefit of using this boilerplate is that you can save time and effort by using a pre-configured project that is ready to use. You can also customize the project to your needs by adding or removing features.'
        },
        {
          question: 'What technologies are included in this boilerplate?',
          answer: 'This boilerplate includes Nuxt.js, Vue 3, TypeScript, and TailwindCSS, providing a modern and robust foundation for your web applications.'
        },
        {
          question: 'How do I get started with development?',
          answer: 'After purchasing the boilerplate, you will receive a zip file containing the boilerplate. Unzip the file and run `npm install` to install dependencies, then `npm run dev` to start the development server. The application will be available at localhost:3000. You can also find the official documentation of Nuxt.js on www.nuxt.com.'
        },
        {
          question: 'Does it have refund policy?',
          answer: 'No, this boilerplate is a one-time purchase and because of the nature of the product, it does not have a refund policy.'
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
  @apply p-5 rounded-lg border border-gray-200 dark:border-gray-800;
}
</style> 