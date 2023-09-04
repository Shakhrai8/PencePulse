import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import api from '../apis/api';

const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = email => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isStrongPassword = password => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSignup = async () => {
    try {
      if (!isEmailValid(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      if (!isStrongPassword(password)) {
        Alert.alert(
          'Error',
          'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character',
        );
        return;
      }
      const response = await api.post('/signup', {email, password, username});

      if (response.status === 201) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Signup error:', error);

      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'Username or email is already taken');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        testID="username-input"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        testID="email-input"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        testID="password-input"
      />
      <Button title="Sign Up" onPress={handleSignup} testID="signup-btn" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default SignupScreen;
