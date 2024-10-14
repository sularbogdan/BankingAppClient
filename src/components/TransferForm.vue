<template>
  <div class="transfer-form">
    <h2>Transfer Page</h2>
    <form @submit.prevent="handleTransfer">
      <div class="form-group">
        <label for="sourceCard">Source Card Number</label>
        <input
          v-model="sourceCardNumber"
          type="number"
          id="sourceCard"
          placeholder="Your card number"
          required
        />
      </div>
      <div class="form-group">
        <label for="targetCard">Recipient's Card Number</label>
        <input
          v-model="targetCardNumber"
          type="number"
          id="targetCard"
          placeholder="Recipient's card number"
          required
        />
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          v-model="amount"
          type="number"
          id="amount"
          placeholder="Amount"
          required
        />
      </div>
      <div class="button-container">
        <button type="submit" class="submit-button" @click = "handleTransfer">Submit</button>
        <button type="button" class="cancel-button" @click="cancelTransfer">Cancel</button>
      </div>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
    
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { transfer } from '../services/account_service'; 

const router = useRouter();
const sourceCardNumber = ref('');
const targetCardNumber = ref('');
const amount = ref('');
const message = ref('');
const isSubmitting = ref(false); 

async function handleTransfer() {
  if (isSubmitting.value) return;  
  isSubmitting.value = true;

  try {
    const responseMessage = await transfer(sourceCardNumber.value, targetCardNumber.value, amount.value);
    message.value = responseMessage; 
  } catch (error) {
    if (error.message.includes("Insufficient funds!")) {
      message.value = "Insufficient funds. Please check your balance."; 
    } else {
      message.value = error.message || 'Transfer failed. Please try again.';
    }
  } finally {
    isSubmitting.value = false;
  }
}

function cancelTransfer() {
  router.push("/dashboard");
}
</script>

    
  <style scoped>
.transfer-form {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>