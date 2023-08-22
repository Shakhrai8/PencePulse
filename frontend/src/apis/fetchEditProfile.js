import api, {setAuthToken} from './api';

const editProfile = async (username, token, userId) => {
  setAuthToken(token);
  try {
    const response = await api.post('profile/edit', {
      username,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export default editProfile;
