<template>
    <div class=" bg-slate-200 " >
<div class="md:container md:mx-auto py-3">
    <div class="flex flex-wrap items-center">
        <div class="basis-1/3">
            <span class="text-slate-600">Nuxt 3 Minimal Boilerplate</span> 
        </div>
        <div class="basis-2/3 text-right">
            <div
        class=""
        v-if="user.current.value"
        >
        <p>{{ user.current.providerUid }}</p>
        <button class="btn btn-primary" type="button" @click="user.logout()">
          Logout
        </button>
      </div>
      <!-- Login button if no user logged in -->
      <NuxtLink v-else href="/login" class="btn btn-primary">
        Login
      </NuxtLink>
        </div>
    </div>

</div>
    </div>
</template>

<script setup >
const user = useUserSession();
</script>

<style scoped>

</style>