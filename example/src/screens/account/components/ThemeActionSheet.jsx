import * as React from 'react';
import { Box, Text, Actionsheet, useColorMode as useNbColorMode } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useTranslate, useColorMode } from '@jazasoft/react-native-admin';

const ThemeActionSheet = ({ isOpen, onClose, i18nKey }) => {
  const translate = useTranslate();
  const theme = useTheme();
  const colorMode = useColorMode();
  const { setColorMode } = useNbColorMode();

  const changeTheme = (cm) => {
    setColorMode(cm);
    onClose && onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor={theme.colors.card}>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="16" color="gray.500" _dark={{ color: 'gray.300' }}>
            {translate(`${i18nKey}.theme.title`)}
          </Text>
        </Box>

        <Actionsheet.Item bgColor={theme.colors.card} isDisabled={colorMode === null || colorMode === undefined} onPress={() => changeTheme(null)}>
          {translate(`${i18nKey}.theme.value_automatic`)}
        </Actionsheet.Item>

        <Actionsheet.Item bgColor={theme.colors.card} isDisabled={colorMode === 'light'} onPress={() => changeTheme('light')}>
          {translate(`${i18nKey}.theme.value_light`)}
        </Actionsheet.Item>

        <Actionsheet.Item bgColor={theme.colors.card} isDisabled={colorMode === 'dark'} onPress={() => changeTheme('dark')}>
          {translate(`${i18nKey}.theme.value_dark`)}
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ThemeActionSheet;
