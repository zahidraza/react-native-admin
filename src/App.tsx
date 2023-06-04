import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export function App(props: any) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
