import * as React from 'react';

import { Box, Center } from 'native-base';

import { useList, useTranslate } from '@jazasoft/react-native-admin';

const TestScreen = ({ i18nKey }) => {
  const translate = useTranslate();
  const { data: departments } = useList('departments', { url: 'departments' });
  console.log({ departments });
  return (
    <Box flex={1} pt="2">
      <Center>{translate(`${i18nKey}.name`)} Screen</Center>
    </Box>
  );
};

export default TestScreen;
