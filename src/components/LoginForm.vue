<template>
  <div class="login-form-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="form-group">
        <label for="card_number">Card number:</label>
        <input
          type="text"
          v-model="card_number"
          id="card_number"
          placeholder="Enter your card number"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button class="login-button" type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div class="signup-container">
      <p>Don't have an account?</p>
      <button class="signup-button" @click="goToSignUp">Sign Up</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/account_service';
import { useAccountStore } from '../stores/accountStore'; 

const name = ref('');
const card_number = ref('');
const password = ref('');
const errorMessage = ref('');

const accountStore = useAccountStore(); 
const router = useRouter();

const handleLogin = async () => {
    try {
        const data = await login(name.value, card_number.value, password.value);
        console.log('Login Response:', data); 

        if (data.accountId) {
            accountStore.setAccountId(data.accountId);
            console.log('Account ID Set in store:', accountStore.accountId);
        } else {
            console.error('No accountId returned from login response');
        }
        
        router.push('/dashboard'); 
    } catch (error) {
        errorMessage.value = error.message || 'Error occurred during login!';
    }
};

const goToSignUp = () => {
  router.push('/SignUp'); 
};
</script>

<style scoped>
.login-form-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(219, 214, 214);
  border-radius: 8px;
  text-align: left; 
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.login-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: rgb(219, 214, 214);
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #bfbfbf; 
}

.error {
  color: red;
  margin-top: 10px;
}

.signup-container {
  margin-top: 20px;
  text-align: center;
}

.signup-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.signup-button:hover {
  background-color: #218838; 
}
</style>
