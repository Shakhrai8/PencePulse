import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import store from './store'; // Import your existing store
import MainNavigator from './src/navigation/MainNavigator';

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
