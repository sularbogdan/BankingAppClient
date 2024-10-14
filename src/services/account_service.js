const API_URL = 'http://localhost:8080/api/accounts';


export async function login(name, cardNumber, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, cardNumber, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid name, card number or password');
    }

    const data = await response.json();
    if (data.accountId) {
      localStorage.setItem('accountId', data.accountId); 
      console.log('Account ID Set in localStorage:', data.accountId);
    }
    if (data.balance !== undefined) {
      localStorage.setItem('balance', data.balance);
    }

    localStorage.setItem('userName', name); 
    localStorage.setItem('cardNumber', cardNumber);

    return data;
  } catch (error) {
    throw error;
  }
}


export async function signUp(name, cardNumber, password) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, cardNumber, password }),
    });

    if (!response.ok) {
      throw new Error('Error creating account');
    }
    const data = await response.json();
    localStorage.setItem('userName', name); 
    localStorage.setItem('cardNumber', cardNumber);

    return data;
  } catch (error) {
    throw error;
  }
}



export async function deposit(accountId, depositAmount) {
  try {
    const response = await fetch(`${API_URL}/${accountId}/deposit`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: depositAmount,  
      }),
    });

    if (response.ok) {
      const accountData = await response.json();
      return { success: true, data: accountData };
    } else {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage || 'Deposit failed.'};
    }
  } catch (error) {
    console.error('Error during deposit:', error);
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
}

export async function withdraw(accountId, withdrawAmount) {
  try{
    const response = await fetch(`${API_URL}/${accountId}/withdraw`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: withdrawAmount,
      }),
    });
    if(response.ok){
      const accountData = await response.json();
      return {success: true, data: accountData};
    } else {
      const errorMessage = await response.text();
      return {success: false, message: errorMessage || 'Withdraw failed.'};
    }
  } catch (error){
    console.error('Error during withdraw:', error);
    return {success: false, menubar: 'An error occurred. Please try again later.'};
  }
}

export async function transfer(sourceCardNumber, targetCardNumber, amount) {
  try{
    const response = await fetch(`${API_URL}/transfer`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceCardNumber,
        targetCardNumber,
        amount,
      }),
    });
    if(response.ok){
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Transfer failed!');
    }
    return await response.text();
  } catch (error){
    throw error;
  }
}

export const deleteAccount = async (accountId) => {
  try {
    const response = await fetch(`${API_URL}/${accountId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};


