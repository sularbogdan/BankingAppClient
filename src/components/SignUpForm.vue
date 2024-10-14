<template>
  <div class="signup-container">
    <h2>Register</h2>
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div class="form-group">
        <label for="cardNumber">Card Number</label>
        <input
          v-model="cardNumber"
          type="text"
          id="cardNumber"
          placeholder="Enter your card number"
          required
        />
        <span v-if="cardNumberError" class="error">{{ cardNumberError }}</span>
      </div>
       <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="form-group button-group">
        <button class="signup-button" type="submit">Sign Up</button>
        <button class="cancel-button" @click="cancelSignUp">Cancel</button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signUp } from '../services/account_service';
import { useRouter } from 'vue-router';

const name = ref('');
const cardNumber = ref('');
const password = ref('');
const errorMessage = ref('');
const cardNumberError = ref('');
const router = useRouter();

async function handleSignUp() {
  cardNumberError.value = '';
  errorMessage.value = '';
  
  if (cardNumber.value.length < 8 || isNaN(cardNumber.value)) {
    cardNumberError.value = 'Card number must be at least 8 digits and numeric!';
    return;
  }

  try {
    const response = await signUp(name.value, cardNumber.value, password.value);
    console.log('Registration successful!', response);
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Error during sign up. Please try again.';
    console.log('Sign up error: ', error);
  }
}

function cancelSignUp() {
  router.push('/login'); 
}
</script>

<style scoped>
.signup-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(219, 214, 214); 
  border-radius: 8px;
  text-align: left; 
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.signup-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: rgb(219, 214, 214); 
  color: black;
  cursor: pointer;
  font-size: 16px;
}

.signup-button:hover, .cancel-button:hover {
  background-color: #bfbfbf; 
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}

.cancel-button {
  background-color: #dc3545; 
  color: white;
}

.cancel-button:hover {
  background-color: #c82333; 
}
</style>
