import React from 'react';
import {View, Button} from 'react-native';
import LogoutButton from './LogoutButton';

const CustomNavbar = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row', paddingRight: 10}}>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <LogoutButton navigation={navigation} />
    </View>
  );
};

export default CustomNavbar;
