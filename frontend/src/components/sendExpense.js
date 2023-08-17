import api, {setAuthToken} from './api';

const sendExpense = async (data, token) => {
  setAuthToken(token);
  try {
    const response = await api.post('/add/expense', data);
    return response.data;
  } catch (error) {
    console.error('Error sending expense:', error);
    throw error;
  }
};

export default sendExpense;
