import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import changePassword from '../components/fetchChangePassword';
import {useSelector} from 'react-redux';

const ChangePasswordScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const handleSubmit = async () => {
    try {
      await changePassword(oldPassword, newPassword, token, userId);
      Alert.alert('Success', 'Password changed successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an issue changing your password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <TextInput
        placeholder="Old Password"
        secureTextEntry={true}
        onChangeText={setOldPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry={true}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <Button title="Change Password" onPress={handleSubmit} />
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

export default ChangePasswordScreen;
