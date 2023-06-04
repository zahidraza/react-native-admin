import * as React from 'react';
import { Divider, HStack, Text } from 'native-base';
import useTranslate from '../i18n/useTranslate';
import { useTheme } from '@react-navigation/native';

function TextField({ label, value, labelProps, valueProps, dividerProps, bottomDivider = false, ...props }) {
  const translate = useTranslate();
  const theme = useTheme();
  return (
    <>
      <HStack p="3" bgColor={theme.colors.card} {...props}>
        <Text flex={1} {...labelProps}>
          {translate(label, { defaultValue: label })}
        </Text>
        <Text flex={3} textAlign="right" {...valueProps}>
          {value}
        </Text>
      </HStack>
      {bottomDivider && <Divider {...dividerProps} />}
    </>
  );
}

TextField.whyDidYouRender = {
  customName: 'TextField',
};

export default React.memo(TextField);
