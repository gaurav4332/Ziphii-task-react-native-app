// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './MyStack';


export default function Routes() {
  return (
    <NavigationContainer>
     {MyStack()}
    </NavigationContainer>
  );
}
