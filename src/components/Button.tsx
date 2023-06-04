import * as React from 'react';

import { Text, TouchableHighlight } from 'react-native';

const Button = (props: any) => {
  return (
    <TouchableHighlight onPress={props?.onPress}>
      <Text>{props?.label}</Text>
    </TouchableHighlight>
  );
};

export default Button;
