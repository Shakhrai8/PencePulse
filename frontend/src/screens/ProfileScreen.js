import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <Button
        title="Change Password"
        // onPress={() => navigation.navigate('ChangePassword')}
      />

      <Button
        title="Edit Profile Details"
        // onPress={() => navigation.navigate('EditProfile')}
      />

      <Button
        title="Notifications Settings"
        // onPress={() => navigation.navigate('NotificationSettings')}
      />

      <Button title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;
