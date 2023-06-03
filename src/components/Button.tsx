import * as React from 'react';

import { Text, TouchableHighlight } from 'react-native';

export const Button = (props: any) => {
  return (
    <TouchableHighlight onPress={props?.onPress}>
      <Text>{props?.label}</Text>
    </TouchableHighlight>
  );
};
