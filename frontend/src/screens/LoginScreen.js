import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import api from '../apis/api';
import {useDispatch} from 'react-redux';
import {setToken, setUsername} from '../../reducers/authSlice';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {email, password});

      if (response.data && response.data.token) {
        dispatch(setToken(response.data.token));
        dispatch(setUsername(response.data.username));
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        Alert.alert('Error', 'Wrong password or the user doesnt exist');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        testID="email-login"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        testID="password-login"
      />
      <Button title="Login" onPress={handleLogin} testID="login-btn" />
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

export default LoginScreen;
