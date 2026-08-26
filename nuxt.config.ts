// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // layers/design-kit is auto-registered from the layers/ directory
  srcDir: '.',
  dir: {
    app: 'app',
  },
  app: {
    head: {
      title: 'Nuxtz — Free Nuxt 4 Boilerplate',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Nuxtz is a free, open-source Nuxt 4 boilerplate with Tailwind CSS, Shadcn UI, Nuxt Icons, and Cursor rules — clone it and start building in minutes.',
        },
        { name: 'keywords', content: 'Nuxt 4, Vue 3, boilerplate, Tailwind CSS, Shadcn UI, free, open source, starter template' },
        { name: 'author', content: 'Babak Sadeghzadeh' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Nuxtz — Free Nuxt 4 Boilerplate' },
        {
          property: 'og:description',
          content: 'A free, open-source Nuxt 4 starter with Tailwind CSS, Shadcn UI, Nuxt Icons, and AI-friendly Cursor rules.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://nuxtz.vercel.app' },
        { property: 'og:site_name', content: 'Nuxtz' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nuxtz — Free Nuxt 4 Boilerplate' },
        {
          name: 'twitter:description',
          content: 'Clone, install, and ship faster with a modern Nuxt 4 starter template.',
        },
        { name: 'twitter:creator', content: '@babakzy' },
      ],
      link: [
        { rel: 'canonical', href: 'https://nuxtz.vercel.app' },
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-41XN9ZLJH0',
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-41XN9ZLJH0');
          `,
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-mcp-dev',
  ],
  // Inter is self-hosted via @fontsource-variable/inter (design-kit layer).
  // Re-add @nuxt/fonts when you need remote/local font providers for extra families.
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  image: {},
  css: ['~/assets/css/default.scss', '~/assets/css/tailwind.css'],
})
