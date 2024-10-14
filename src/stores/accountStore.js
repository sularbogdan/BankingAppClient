import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountId: null, 
  }),
  actions: {
    setAccountId(id) {
      this.accountId = id; 
    },
  },
});
