<template>
  <div class="mx-auto max-w-content px-6 py-16 md:py-20">
    <h1 class="dk-display-lg text-[var(--dk-ink)] mb-6">
      Privacy Policy
    </h1>
    <div class="dk-body space-y-6 text-[var(--dk-ink-muted-80)]">
      <p class="dk-caption text-[var(--dk-ink-muted-48)]">
        Last updated: {{ updated }}
      </p>

      <section>
        <h2 class="dk-body-strong text-[var(--dk-ink)] mb-2">
          1. Information We Collect
        </h2>
        <p>
          We collect information that you provide directly to us, including name and contact information when you create an account, communication preferences, and usage data. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and cookies.
        </p>
      </section>

      <section>
        <h2 class="dk-body-strong text-[var(--dk-ink)] mb-2">
          2. How We Use Your Information
        </h2>
        <p>
          We use the collected information to provide and maintain our services, notify you about changes, provide support, improve the product, and detect or address technical issues. We may use third-party providers to help analyze usage and process data on our behalf.
        </p>
      </section>

      <section>
        <h2 class="dk-body-strong text-[var(--dk-ink)] mb-2">
          3. Data Protection
        </h2>
        <p>
          We implement appropriate security measures to protect your personal information. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
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
  title: 'Privacy Policy — Nuxtz',
  description: 'Privacy policy for the Nuxtz Nuxt 4 boilerplate site.',
})

const updated = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>
