<template>
  <section id="install" class="mx-auto max-w-2xl px-4 py-16 md:py-20">
    <h2 class="dk-display-md mb-2 text-center text-[var(--dk-ink)]">
      Get started
    </h2>
    <p class="dk-body mb-8 text-center text-[var(--dk-ink-muted-80)]">
      Clone the repository, install dependencies, and run the dev server.
    </p>

    <div class="overflow-hidden rounded-[var(--dk-radius-lg)] border border-[var(--dk-hairline)]">
      <div class="flex items-center justify-between border-b border-[var(--dk-hairline)] bg-[var(--dk-canvas-parchment)] px-4 py-2">
        <span class="dk-caption text-[var(--dk-ink-muted-48)]">Terminal</span>
        <DkButton
          variant="pearl"
          class="!py-1.5 !px-3"
          @click="copyAll"
        >
          <Icon
            :name="copied ? 'lineicons:checkmark' : 'lineicons:copy'"
            class="size-3.5"
          />
          {{ copied ? 'Copied' : 'Copy' }}
        </DkButton>
      </div>
      <pre class="overflow-x-auto bg-[var(--dk-surface-black)] p-4 text-sm leading-relaxed text-[var(--dk-body-muted)]"><code><span class="text-white/40"># Clone the repository</span>
git clone https://github.com/babakzy/nuxtz.git
cd nuxtz

<span class="text-white/40"># Install dependencies</span>
npm install

<span class="text-white/40"># Start the dev server</span>
npm run dev</code></pre>
    </div>

    <p class="dk-caption mt-4 text-center text-[var(--dk-ink-muted-48)]">
      Runs at
      <DkTextLink href="http://localhost:3000">localhost:3000</DkTextLink>.
      Source on
      <DkTextLink href="https://github.com/babakzy/nuxtz">GitHub</DkTextLink>.
    </p>
  </section>
</template>

<script setup lang="ts">
const copied = ref(false)

const installCommands = `git clone https://github.com/babakzy/nuxtz.git
cd nuxtz
npm install
npm run dev`

async function copyAll() {
  await navigator.clipboard.writeText(installCommands)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>
