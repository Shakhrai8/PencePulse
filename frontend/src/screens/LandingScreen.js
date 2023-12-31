import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Logo from '../components/Logo';

const LandingScreen = ({navigation}) => {
  const LogoRef = useRef(null);

  useEffect(() => {
    if (LogoRef.current) {
      LogoRef.current.postMessage('play');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Logo ref={LogoRef} testID="logo" />
      <Text style={styles.title}>Welcome to PencePulse</Text>
      <Text style={styles.subtitle}>Your Personal Finance Tracker</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
