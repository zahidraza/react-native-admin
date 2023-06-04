import * as React from 'react';

import { Box, HStack, Text, CircleIcon } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useTranslate } from '@jazasoft/react-native-admin';

function Tile({ label, value, icon, color, labelProps, valueProps, ...props }) {
  const theme = useTheme();
  const translate = useTranslate();
  return (
    <Box bgColor={theme.colors.card} pl="1" pr="2" py="2" borderRadius="lg" {...props}>
      <HStack justifyContent="space-between" alignItems="center">
        {icon && React.cloneElement(icon, { color: color || theme.colors.primary })}
        {!icon && <CircleIcon color={color || theme.colors.primary} />}
        <Text ml="2" textAlign="right" {...labelProps}>
          {translate(label, { defaultValue: label })}
        </Text>
      </HStack>
      <Box>
        <Text textAlign="right" fontSize="xl" fontWeight="bold" {...valueProps}>
          {value}
        </Text>
      </Box>
    </Box>
  );
}

Tile.whyDidYouRender = {
  customName: 'Tile',
};

export default React.memo(Tile);
