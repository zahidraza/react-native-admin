import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppState } from '@react-native-community/hooks';
import { isEqual } from './util';

export function App(props: any) {
  const appState = useAppState();
  const u1 = { name: 'Zahid' };
  const u2 = { name: 'Zahid' };
  const u3 = { name: 'Mojahid' };
  console.log({ t1: isEqual(u1, u2), t2: isEqual(u1, u3), appState });
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
