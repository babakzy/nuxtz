<template>
  <section id="install" class="mt-20 w-full max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-2">Get Started</h2>
    <p class="text-center text-gray-600 dark:text-gray-400 mb-8">
      Nuxtz is free and open source. Clone the repo, install dependencies, and start building.
    </p>

    <div class="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <span class="text-sm text-gray-500">Terminal</span>
        <Button variant="ghost" size="sm" @click="copyAll">
          <Icon :name="copied ? 'lineicons:checkmark' : 'lineicons:copy'" class="w-4 h-4 mr-1" />
          {{ copied ? 'Copied!' : 'Copy' }}
        </Button>
      </div>
      <pre class="p-4 text-sm overflow-x-auto bg-gray-950 text-gray-100"><code><span class="text-gray-500"># Clone the repository</span>
git clone https://github.com/babakzy/nuxtz.git
cd nuxtz

<span class="text-gray-500"># Install dependencies</span>
npm install

<span class="text-gray-500"># Start the dev server</span>
npm run dev</code></pre>
    </div>

    <p class="text-center text-sm text-gray-500 mt-4">
      The app runs at
      <a href="http://localhost:3000" class="text-blue-500 hover:text-blue-700">localhost:3000</a>.
      Star the repo on
      <a href="https://github.com/babakzy/nuxtz" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">GitHub</a>
      if you find it useful.
    </p>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const copied = ref(false)

const installCommands = `git clone https://github.com/babakzy/nuxtz.git
cd nuxtz
npm install
npm run dev`

async function copyAll() {
  await navigator.clipboard.writeText(installCommands)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
