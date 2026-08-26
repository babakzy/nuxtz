<template>
  <footer class="bg-[var(--dk-canvas-parchment)] px-6 py-16 text-[var(--dk-ink-muted-80)] md:px-12 md:py-16">
    <div class="mx-auto max-w-store">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="dk-caption-strong mb-3 text-[var(--dk-ink)]">
            Nuxtz
          </p>
          <p class="dk-fine-print max-w-[28ch] leading-relaxed text-[var(--dk-ink-muted-48)]">
            Free Nuxt 4 boilerplate with Tailwind, Shadcn UI, and Cursor rules.
          </p>
          <a
            href="https://www.producthunt.com/posts/nuxtz?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nuxtz"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-block"
          >
            <img
              :src="productHuntBadge"
              alt="Nuxtz on Product Hunt"
              width="200"
              height="43"
              class="h-auto w-[200px]"
              loading="lazy"
            >
          </a>
        </div>

        <div>
          <p class="dk-caption-strong mb-2 text-[var(--dk-ink)]">
            Quick links
          </p>
          <ul class="dk-dense-link">
            <li><NuxtLink to="/" class="text-[var(--dk-ink-muted-80)] hover:text-[var(--dk-primary)]">Home</NuxtLink></li>
            <li><a href="#install" class="text-[var(--dk-ink-muted-80)] hover:text-[var(--dk-primary)]">Get Started</a></li>
            <li><a href="#faq" class="text-[var(--dk-ink-muted-80)] hover:text-[var(--dk-primary)]">FAQ</a></li>
          </ul>
        </div>

        <div>
          <p class="dk-caption-strong mb-2 text-[var(--dk-ink)]">
            Legal
          </p>
          <ul class="dk-dense-link">
            <li>
              <NuxtLink
                to="/privacy-policy"
                class="text-[var(--dk-ink-muted-80)] hover:text-[var(--dk-primary)]"
              >
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/terms-of-service"
                class="text-[var(--dk-ink-muted-80)] hover:text-[var(--dk-primary)]"
              >
                Terms of Service
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="dk-caption-strong mb-3 text-[var(--dk-ink)]">
            Author
          </p>
          <div class="flex items-center gap-3">
            <NuxtImg
              src="/images/babakzy.jpg"
              alt="Babak Sadeghzadeh"
              class="size-12 rounded-full object-cover"
              width="48"
              height="48"
            />
            <div>
              <p class="dk-caption-strong text-[var(--dk-ink)]">
                Babak Sadeghzadeh
              </p>
              <div class="mt-1.5 flex gap-3">
                <a
                  href="https://babakzy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  class="text-[var(--dk-ink-muted-48)] hover:text-[var(--dk-primary)]"
                >
                  <Icon name="ph:globe" class="size-4" />
                </a>
                <a
                  href="https://x.com/babakzy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  class="text-[var(--dk-ink-muted-48)] hover:text-[var(--dk-primary)]"
                >
                  <Icon name="lineicons:x" class="size-4" />
                </a>
                <a
                  href="https://github.com/babakzy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  class="text-[var(--dk-ink-muted-48)] hover:text-[var(--dk-primary)]"
                >
                  <Icon name="lineicons:github" class="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-4 border-t border-[var(--dk-hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="dk-fine-print text-[var(--dk-ink-muted-48)]">
          &copy; {{ year }} Nuxtz. All rights reserved.
        </p>
        <div class="flex flex-wrap items-center gap-4 sm:gap-6">
          <NuxtLink
            to="/privacy-policy"
            class="dk-fine-print text-[var(--dk-ink-muted-48)] hover:text-[var(--dk-primary)]"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            to="/terms-of-service"
            class="dk-fine-print text-[var(--dk-ink-muted-48)] hover:text-[var(--dk-primary)]"
          >
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

const year = new Date().getFullYear()
const isDark = useDark()

const productHuntBadge = computed(() =>
  isDark.value
    ? 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=957654&theme=dark&t=1745565554576'
    : 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=957654&theme=light&t=1745565554576',
)
</script>
