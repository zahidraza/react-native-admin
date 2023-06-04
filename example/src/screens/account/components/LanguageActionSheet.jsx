import * as React from 'react';
import { Box, Text, Actionsheet } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useTranslate, useChangeLocale } from '@jazasoft/react-native-admin';

const LanguageActionSheet = ({ isOpen, localeList, locale, onClose, i18nKey }) => {
  const translate = useTranslate();
  const theme = useTheme();
  const changeLocale = useChangeLocale();

  const changeLanguage = (loc) => {
    changeLocale(loc);
    onClose && onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor={theme.colors.card}>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="16" color="gray.500" _dark={{ color: 'gray.300' }}>
            {translate(`${i18nKey}.lang.title`)}
          </Text>
        </Box>
        {localeList.map((e) => (
          <Actionsheet.Item key={e.locale} bgColor={theme.colors.card} isDisabled={e.locale === locale} onPress={() => changeLanguage(e.locale)}>
            {e.name}
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default LanguageActionSheet;
