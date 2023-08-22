import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import editProfile from '../apis/fetchEditProfile';
import {useSelector} from 'react-redux';

const EditProfileScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const handleSubmit = async () => {
    try {
      await editProfile(username, token, userId);
      Alert.alert('Success', 'Profile updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an issue updating your profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <TextInput
        placeholder="New Username"
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Update Profile" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
  },
});

export default EditProfileScreen;
