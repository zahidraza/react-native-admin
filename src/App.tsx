import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppState } from '@react-native-community/hooks';

export default function App(props: any) {
  const appState = useAppState();
  console.log({ appState });
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
