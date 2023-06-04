import * as React from 'react';

import { Box, Center } from 'native-base';

import { useTranslate } from '@jazasoft/react-native-admin';

const TestScreen = (props: any) => {
  const translate = useTranslate();

  return (
    <Box flex={1} pt="2">
      <Center>{translate(`${props.i18nKey}.name`)} Screen</Center>
    </Box>
  );
};

export default TestScreen;
