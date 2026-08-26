<template>
  <div class="mx-auto max-w-content px-6 py-16 md:py-20">
    <h1 class="dk-display-lg text-[var(--dk-ink)] mb-6">
      Terms of Service
    </h1>
    <div class="dk-body space-y-6 text-[var(--dk-ink-muted-80)]">
      <p class="dk-caption text-[var(--dk-ink-muted-48)]">
        Last updated: {{ updated }}
      </p>

      <section>
        <h2 class="dk-body-strong text-[var(--dk-ink)] mb-2">
          1. Terms
        </h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by these terms. If you do not agree, please do not use this website. Terms may change without notice.
        </p>
      </section>

      <section>
        <h2 class="dk-body-strong text-[var(--dk-ink)] mb-2">
          2. Use License
        </h2>
        <p>
          Permission is granted to use the Nuxtz boilerplate for personal and commercial projects under the project license. You may not misrepresent the origin of the software or remove copyright notices from the materials.
        </p>
      </section>

      <section>
        <h2 class="dk-body-strong text-[var(--dk-ink)] mb-2">
          3. Disclaimer
        </h2>
        <p>
          The materials on this website are provided as-is. Nuxtz makes no warranties, expressed or implied, and hereby disclaims all other warranties including implied warranties of merchantability or fitness for a particular purpose.
        </p>
      </section>

      <DkTextLink href="/">
        Back to home
      </DkTextLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service — Nuxtz',
  description: 'Terms of service for the Nuxtz Nuxt 4 boilerplate site.',
})

const updated = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>
