import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';

const WrapperContainer = ({style = {}, children}) => {
  const {selectedTheme} = useSelector(state => state?.appSetting);

  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor:
          selectedTheme == 'dark' ? colors.dark_theme : colors.light_theme,
      }}>
      <StatusBar
        barStyle={selectedTheme == 'dark' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark_theme,
  },
});
