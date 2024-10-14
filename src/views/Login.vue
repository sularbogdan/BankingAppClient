<template>
  <div class="login-view">
    <h2>Please Login</h2>
    <div class="login-form-container">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h2 {
  margin-bottom: 20px;
}

.login-form-container {
  background-color: rgb(219, 214, 214);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
