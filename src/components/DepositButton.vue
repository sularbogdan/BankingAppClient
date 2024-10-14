<template>
  <div class="custom-deposit-button">
    <button class="deposit-button" @click="toggleInputs">{{ expanded ? 'Deposit' : 'Deposit' }}</button>
    <div v-if="expanded" class="input-container">
      <input type="number" v-model="input" placeholder="Amount" min="0" />
      <div class="button-group">
        <button class="submit-button" @click="handleDeposit">Deposit</button>
        <button class="cancel-button" @click="cancelInput">Cancel</button>
      </div>
    </div>
    <div v-if="message">{{ message }}</div> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { deposit } from '../services/account_service'; 

const expanded = ref(false);
const input = ref('');
const message = ref('');
const accountId = localStorage.getItem('accountId'); 


function toggleInputs() {
    expanded.value = !expanded.value;
}

function cancelInput() {
    input.value = '';
    expanded.value = false;
}

async function handleDeposit() {
    if (input.value > 0) {
        const { success, data, message: errorMessage } = await deposit(accountId, input.value);

        if (success) {
            message.value = 'Deposit successful!';
        } else {
            message.value = errorMessage || 'Deposit failed. Please try again.';
        }

        input.value = '';
        expanded.value = false;
    } else {
        message.value = 'Please enter a valid amount.';
    }
}
</script>


<style scoped>
.custom-deposit-button {
  text-align: left;
  margin-right: 30px;
}

.deposit-button {
  padding: 10px 20px;
  border: none; 
  border-radius: 5px;
  background-color: rgb(219, 214, 214);
  color: black;
  cursor: pointer;
  font-size: 16px;
}

.input-container {
  margin-top: 10px;
  min-width: 100px; 
}

input {
  margin-top: 10px; 
  padding: 10px;
  width: 70px; 
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  margin-top: 10px; 
  display: flex; 
  gap: 10px; 
}

.submit-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #218838;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.cancel-button{
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
</style>
