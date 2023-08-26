import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import LogoSvg from '../components/LogoSvg';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LogoSvg width={300} height={300} />
      <Text style={styles.header}>Profile</Text>
      <Button
        title="Change Password"
        onPress={() => navigation.navigate('ChangePassword')}
      />
      <Button
        title="Edit Profile Details"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <LogoutButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 0,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;
