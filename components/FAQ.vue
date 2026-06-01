<template>
  <section  class="faq-section flex flex-wrap justify-center mt-20">
    <div  class="basis-full md:basis-1/2 md:pr-4">
        <h2 class="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
       <h1 class="text-2xl font-bold">What is Nuxtz?</h1>
        <p class="">Nuxtz is a free, open-source boilerplate for Nuxt 4. It ships with popular configurations and features so you can start building a modern web application without setting everything up from scratch.</p>
      
        <p class="my-6">If you have any questions, feel free to reach out to <a href="https://babakzy.com" class="text-blue-500 hover:text-blue-700">Babak Sadeghzadeh</a>.</p>
     
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
      faqs: [
        {
          question: 'Is Nuxtz really free?',
          answer: 'Yes. Nuxtz is completely free and open source. Clone it from GitHub, run npm install, and use it for personal or commercial projects.',
        },
        {
          question: 'What is the benefit of using this boilerplate?',
          answer: 'You save time by starting from a pre-configured Nuxt 4 project with Tailwind CSS, Shadcn UI, dark mode, and Cursor rules already set up.',
        },
        {
          question: 'What technologies are included?',
          answer: 'Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Shadcn UI, Nuxt Icons, Nuxt Image, Nuxt Fonts, VueUse, and nuxt-mcp-dev for AI-assisted development.',
        },
        {
          question: 'How do I get started?',
          answer: 'Run git clone https://github.com/babakzy/nuxtz.git, then cd nuxtz, npm install, and npm run dev. The app will be available at localhost:3000.',
        },
        {
          question: 'Can I customize the included features?',
          answer: 'Absolutely. The boilerplate is modular — add or remove features by editing the config and installing additional dependencies as needed.',
        },
        {
          question: 'Where can I find documentation?',
          answer: 'See nuxt.com for Nuxt, vuejs.org for Vue, tailwindcss.com for Tailwind, and shadcn-vue.com for Shadcn UI components.',
        },
      ],
    }
  },
  methods: {
    toggleFAQ(index: number) {
      this.openIndex = this.openIndex === index ? null : index
    },
  },
})
</script>

<style scoped>

.faq-item {
  @apply p-5 rounded-lg border border-gray-200 dark:border-gray-800;
}
</style>
