<template>
  <section id="faq" class="mx-auto max-w-store px-4 py-16 md:py-20">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 class="dk-display-md mb-6 text-[var(--dk-ink)]">
          Frequently asked questions
        </h2>
        <p class="dk-body text-[var(--dk-ink-muted-80)]">
          Nuxtz is a free Nuxt 4 boilerplate with common tooling included.
          Contact
          <DkTextLink href="https://babakzy.com">Babak Sadeghzadeh</DkTextLink>
          if you have questions.
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.question"
          class="rounded-[var(--dk-radius-lg)] border border-[var(--dk-hairline)] p-5"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 text-left"
            :aria-expanded="openIndex === index"
            @click="toggleFAQ(index)"
          >
            <span class="dk-body-strong text-[var(--dk-ink)]">
              {{ faq.question }}
            </span>
            <Icon
              name="ph:caret-down"
              class="size-5 shrink-0 text-[var(--dk-ink-muted-48)] transition-transform duration-200"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
          <p
            v-show="openIndex === index"
            class="dk-body mt-2 text-[var(--dk-ink-muted-80)]"
          >
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

const faqs = [
  {
    question: 'Is Nuxtz free?',
    answer: 'Yes. Nuxtz is open source. Clone it from GitHub, run npm install, and use it for personal or commercial projects.',
  },
  {
    question: 'Why use this boilerplate?',
    answer: 'It saves setup time. Nuxt 4, Tailwind CSS, Shadcn UI, dark mode, and Cursor rules are already configured.',
  },
  {
    question: 'What technologies are included?',
    answer: 'Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Shadcn UI, Nuxt Icons, Nuxt Image, VueUse, Inter via Fontsource, and a design-kit Nuxt layer.',
  },
  {
    question: 'How do I get started?',
    answer: 'Run git clone https://github.com/babakzy/nuxtz.git, then cd nuxtz, npm install, and npm run dev. The app runs at localhost:3000.',
  },
  {
    question: 'Can I customize it?',
    answer: 'Yes. Add or remove modules, edit the config, and install additional dependencies as needed.',
  },
  {
    question: 'Where is the documentation?',
    answer: 'See nuxt.com, vuejs.org, tailwindcss.com, and shadcn-vue.com. Design tokens are documented in DESIGN-KIT.md.',
  },
]

function toggleFAQ(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
