<template>
    <footer class=" py-8 mt-20">
      <div class="container max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="font-bold text-xl mb-4">Nuxtz</h3>
            <p class="text-gray-600 mb-4">Your trusted boilerplate for building amazing web applications extra fast.</p>
            <div class="flex space-x-4">
              <a href="https://x.com/babakzy" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://x.com/babakzy" target="_blank" >
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/babakzy" target="_blank">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
  
          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-lg mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/" >Home</NuxtLink></li>
              <li><NuxtLink to="/features" >Features</NuxtLink></li>
              <li><NuxtLink to="/pricing" >Pricing</NuxtLink></li>
              <li><NuxtLink to="/contact" >Contact</NuxtLink></li>
            </ul>
          </div>
  
          <!-- Legal -->
          <div>
            <h4 class="font-semibold text-lg mb-4">Legal</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/privacy-policy" >Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/terms-of-service" >Terms of Service</NuxtLink></li>
            </ul>
          </div>
  
          <!-- Newsletter -->
          <div>
            <h4 class="font-semibold text-lg mb-4">Maker</h4>
            <div class="flex gap-3 items-center mt-6">
          <img src="/images/babakzy.jpg" class="w-16 h-16 rounded-full" />
          <div>
            <h3 class="text-lg font-semibold">Babak Sadeghzadeh</h3>
            <!-- <p class="text-sm text-gray-600 dark:text-gray-400">Maker of Nuxtz Boilerplate</p> -->
            <div class="flex gap-3 mt-2">
              <a href="https://babakzy.com" target="_blank" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="ph:globe" class="w-5 h-5" />
              </a>
              <a href="https://x.com/babakzy" target="_blank" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="lineicons:x" class="w-5 h-5" />
              </a>
              <a href="https://github.com/babakzy" target="_blank" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <Icon name="lineicons:github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
          </div>
        </div>
  
        <!-- Bottom Bar -->
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
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const language = ref('en')
  
  const subscribeToNewsletter = () => {
    // Implement newsletter subscription logic here
    console.log('Newsletter subscription:', email.value)
    email.value = ''
  }
  </script>
  
  <style lang="scss" scoped>
  footer {
    a {
      transition: all 0.3s ease;
    }
  }
  </style>