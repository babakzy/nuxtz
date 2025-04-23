// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-mcp',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirect: false
  },
  vite: {
    optimizeDeps: {
      include: [
        '@supabase/supabase-js',
        '@supabase/ssr'
      ]
    }
  },
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      // Add public keys here if needed
    },
    // Keys within private are only available server-side
    stripeSecretKey: process.env.STRIPE_SECRET, // Get from .env
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // Add your Supabase Service Role Key to .env for server-side updates
    resendApiKey: process.env.RESEND_API_KEY, // Resend API key for sending emails
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  image: {
    // Options
  },
  css: ['~/assets/css/default.scss'],
})