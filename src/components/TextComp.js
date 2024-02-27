import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveSize';
import fonts from '../assets/fonts';

const TextComp = ({text = '', style = {}, children, ...props}) => {
  const {selectedTheme} = useSelector(state => state?.appSetting);

  return (
    <Text
      {...props}
      style={{
        ...styles.textStyle,
        color: selectedTheme == 'dark' ? colors.white : colors.blackColor,
        ...style,
      }}>
      {text}
      {children}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: textScale(12),
    textAlign: 'left',
    color: colors.white,
    fontFamily: fonts.NunitoRegular,
  },
});
