<template>
  <div class="dashboard">
    <button class="logout-button" @click="logout">Logout</button>
    <button class="delete-button" @click="deleteAccountHandler">Delete Account</button>
    <h1>Your Account</h1>
    <div class="image-container">
      <img src="../assets/img/card.jpg" alt="Account Card" class="account-image" />
    </div>
    <div class="name-account">
      {{ userName }}
    </div>
    <div class="card-number-account">
      {{ cardNumber }}
    </div>
    <div class="button-container">
      <DepositButton />
      <WithdrawButton />
      <TransferButton />
      <Balance />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';
import DepositButton from '../components/DepositButton.vue';
import WithdrawButton from '../components/WithdrawButton.vue';
import TransferButton from '../components/TransferButton.vue';
import Balance from '../components/Balance.vue';
import { deleteAccount } from '../services/account_service';

const router = useRouter();
const userName = ref('');
const cardNumber = ref('');

function fetchUserName() {
  return localStorage.getItem('userName'); 
}
function fetchCardNumber() {
  return localStorage.getItem('cardNumber');
}

onMounted(() => {
  userName.value = fetchUserName(); 
  cardNumber.value = fetchCardNumber();
  if (!userName.value) {
    router.push('/login'); 
  }
});

const deleteAccountHandler = async () => {
  try {
    const accountId = localStorage.getItem('accountId'); 
    router.push("/login");
    if (!accountId) {
      console.error('No account ID found in local storage.');
      return; 
    }

    await deleteAccount(accountId); 
    console.log('Account deleted successfully');
    localStorage.removeItem('userName');
    localStorage.removeItem('accountId');
    router.push('/login');
  } catch (error) {
    console.error('Error deleting account:', error);
  }
};

const logout = () => {
  localStorage.removeItem('userName'); 
  router.push('/login'); 
};
</script>

<style scoped>
.dashboard {
  width: 500px;
  height: 700px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

.delete-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

h1 {
  margin-bottom: 20px;
}

.image-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.account-image {
  width: 400px;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.name-account {
  position: absolute; 
  top: 180px; 
  left: 56%; 
  transform: translate(-50%, -50%); 
  font-size: 20px; 
  color: rgb(219, 214, 214); 
  width: 200px;
}

.card-number-account {
  position: absolute; 
  top: 300px; 
  left: 56%; 
  transform: translate(-50%, -50%); 
  font-size: 20px; 
  color: rgb(219, 214, 214); 
  width: 200px;
  letter-spacing: 4px;
}

.button-container {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 20px; 
  margin-top: 80px;
  margin-left: 80px;
  justify-content: center; 
}
</style>
