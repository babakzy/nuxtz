
<template>
    <form
      class=""
      @submit.prevent="handleSubmit"
    >
      <ul class="form-list">
        <!-- Input field e-mail -->
        <li class="form-item">
          <label class="label">Email</label>
          <div class="input-text-wrapper">
            <input
              type="email"
              name="email"
              class="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>
        </li>
        <!-- Input field e-mail -->
        <li class="form-item">
          <label class="label">Password</label>
          <div class="input-text-wrapper">
            <input
              type="password"
              name="password"
              class="input input-bordered w-full "
              placeholder="Password"
              required
            />
          </div>
        </li>
      </ul>
      <div class=" mt-4 text-center">
        <!-- Login button  -->
    
          <button
            class="btn btn-primary w-full"
            aria-label="Login"
            @click="handleSubmit"
          >
            {{submitType}}
          </button>
   
      </div>
    </form>
    </template>
    
    <script setup>
    import { defineProps } from 'vue'
    
    const props = defineProps({
      handleSubmit: {
        type: Function,
        required: true
      },
      submitType: {
        type: String,
        required: true
      }
    })
    </script>