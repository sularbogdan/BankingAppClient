<template>
    <div class ="custom-transfer-button">
        <button class="transfer-button" @click="transfer">Transfer</button>
    </div>
    
    </template>
    
    <script setup>
    import { useRouter } from 'vue-router';
    
    const router = useRouter();

    function transfer() {
    router.push('/transfer');
    }
    </script>
    
     <style scoped>
    
    .custom-transfer-button {
      text-align: left; 
    }
    
    .transfer-button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: rgb(219, 214, 214);
      color: black;
      cursor: pointer;
      font-size: 16px;
    }
    
    </style>