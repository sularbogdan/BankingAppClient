<template>
    <div class="balance-container">
      <div class="balance-input">
        <input 
          type="text"
          :value="showBalance ? balance : 'Balance'"
          id="balance"
          readonly
        />
        <button @click="toggleBalanceVisibility" class="toggle-button">
          <span v-if="showBalance">&#128065;</span> 
          <span v-else>&#128065;</span> 
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted} from 'vue';
  
  const balance = ref(''); 
  const showBalance = ref(false); 
  
  const toggleBalanceVisibility = () => {
    showBalance.value = !showBalance.value;
  };

  onMounted(() => {
    const storedBalance = localStorage.getItem('balance');
    if(storedBalance){
      balance.value = parseFloat(storedBalance).toFixed(2);
    }
  })
  </script>
  
  <style scoped>
  .balance-container {
    display: flex;
    flex-direction: column;
    
  }
  
  .balance-input {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  input {
    padding: 10px 20px;
  border: none; 
  width: 70px;
  border-radius: 5px;
  background-color: rgb(219, 214, 214);
  color: black;
  cursor: pointer;
  font-size: 16px;
    }
  
  
  .toggle-button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .toggle-button:hover {
    color: #007BFF;
  }
  </style>