import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { useColorModeValue } from 'native-base';

function FocusAndThemeAwareStatusBar(props: any) {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const barStyle = useColorModeValue('dark-content', 'light-content');

  return isFocused ? <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} {...props} /> : null;
}

export default FocusAndThemeAwareStatusBar;
