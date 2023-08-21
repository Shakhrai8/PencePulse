import React from 'react';
import {Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../../reducers/authSlice';

const LogoutButton = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Logout', onPress: handleLogout},
      ],
      {cancelable: true},
    );
  };

  return <Button title="Logout" onPress={confirmLogout} />;
};

export default LogoutButton;
