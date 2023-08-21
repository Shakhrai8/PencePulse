import api, {setAuthToken} from './api';

const sendIncome = async (data, token) => {
  setAuthToken(token);
  try {
    const response = await api.post('transaction/addIncome', data);
    return response.data;
  } catch (error) {
    console.error('Error sending income:', error);
    throw error;
  }
};

export default sendIncome;
