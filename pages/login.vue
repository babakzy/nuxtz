<script setup>
import { ref } from 'vue';

// Access user composable functions
const user = useUserSession();

const isSignUp = ref(false);

// Login user event handler
const handleLogin = async (event) => {
  const form = event.target;
  const formData = new FormData(form);

  await user.login(formData.get('email'), formData.get('password'));

  form.reset(); // Clear the form
};

const handleRegistration = async (event) => {
  const form = event.target;
  const formData = new FormData(form);

  await user.register(formData.get('email'), formData.get('password'));

  form.reset(); // Clear the form
};
</script>

<template>
  <div class="flex justify-center">
    <section class="md:basis-1/4 bg-slate-100 p-5 mt-16 rounded-lg">
      <h2 class="text-center text-xl">Login/Register</h2>
      <AuthForm v-if="isSignUp" :handle-submit="handleRegistration" submit-type="Sign Up"></AuthForm>
      <AuthForm v-else :handle-submit="handleLogin" submit-type="Log In"></AuthForm>
      <button v-if="isSignUp" @click="isSignUp = false" class="text-slate-500 mt-4">
        Already have an account? Log in
      </button>
      <button v-else @click="isSignUp = true" class="text-slate-500 mt-4">
        Don't have an account? Sign up
      </button>
    </section>
  </div>
</template>