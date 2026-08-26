// Design kit layer — Apple-inspired tokens & repeatable UI from DESIGN-KIT.md
// SF Pro substitute: Inter (explicit in kit for non-Apple platforms)
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  $meta: {
    name: 'design-kit',
  },
  css: [
    '@fontsource-variable/inter/wght.css',
    join(currentDir, 'assets/css/tokens.css'),
    join(currentDir, 'assets/css/kit.css'),
  ],
})
