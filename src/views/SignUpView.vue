<template>
    <div class="signup-view">
      <SignUpForm />
    </div>
  </template>
  
  <script setup>
  import SignUpForm from '../components/SignUpForm.vue';
  </script>
  
  <style scoped>
  .signup-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  </style>
  