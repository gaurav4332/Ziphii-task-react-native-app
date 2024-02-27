import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {getData} from './src/utils/helperFunctions';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';
import { changeAppTheme } from './src/redux/actions/appSettings';
const {dispatch} = store;

const App = () => {
  useEffect(() => {
    AppTheme();
  }, []);
  const AppTheme = async () => {
    try {
      let myTheme = await getData('app_theme');
      if (!!myTheme) {
        changeAppTheme(myTheme);
      }
    } catch (error) {
      console.log('No theme Data Found ', error);
    }
  };
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
