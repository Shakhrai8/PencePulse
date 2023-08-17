import api, {setAuthToken} from './api';

const fetchTransactions = async (token, userId) => {
  setAuthToken(token);
  try {
    const response = await api.get(`transaction/getTransactions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export default fetchTransactions;
