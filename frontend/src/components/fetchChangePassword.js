import api, {setAuthToken} from './api';

const changePassword = async (oldPassword, newPassword, token, userId) => {
  setAuthToken(token);
  try {
    const response = await api.post('profile/changePassword', {
      oldPassword,
      newPassword,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export default changePassword;
