<template>
    <NuxtLayout>
    <NuxtLoadingIndicator :height="6" color="#4F46E5" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()



// onMounted(()=>{
  
// })
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";
h2{
  font-family: "Play", sans-serif;
}
</style>