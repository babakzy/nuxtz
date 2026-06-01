<template>
    <footer class=" py-8 mt-20">
      <div class="container max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold text-xl mb-4">Nuxtz</h3>
            <p class="text-gray-600 mb-4">Free Nuxt 4 boilerplate for building modern web applications with Tailwind CSS, Shadcn UI, and AI-friendly Cursor rules.</p>
            <a href="https://www.producthunt.com/posts/nuxtz?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nuxtz" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=957654&theme=light&t=1745565554576" alt="Nuxtz - Nuxt&#0046;js&#0032;Boilerplate | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
          </div>
  
          <div>
            <h4 class="font-semibold text-lg mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><a href="#install">Get Started</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="https://github.com/babakzy/nuxtz" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
  
          <div>
            <h4 class="font-semibold text-lg mb-4">Legal</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/terms-of-service">Terms of Service</NuxtLink></li>
            </ul>
          </div>
  
          <div>
            <h4 class="font-semibold text-lg mb-4">Contact</h4>
            <div class="flex gap-3 items-center mt-2">
          <img src="/images/babakzy.jpg" class="w-16 h-16 rounded-full" alt="Babak Sadeghzadeh" />
          <div>
            <h3 class="text-lg font-semibold">Babak Sadeghzadeh</h3>
            <div class="flex gap-3 mt-2">
              <a href="https://babakzy.com" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="ph:globe" class="w-5 h-5" />
              </a>
              <a href="https://x.com/babakzy" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="lineicons:x" class="w-5 h-5" />
              </a>
              <a href="https://github.com/babakzy" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="lineicons:github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
          </div>
        </div>
  
        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <p class="text-gray-600">&copy; {{ new Date().getFullYear() }} Nuxtz. All rights reserved.</p>
            </div>
            
            <div class="flex gap-6">
              <NuxtLink 
                to="/privacy-policy"
                class="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </NuxtLink>
              <NuxtLink 
                to="/terms-of-service"
                class="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <style lang="scss" scoped>
  footer {
    a {
      transition: all 0.3s ease;
    }
  }
  </style>
