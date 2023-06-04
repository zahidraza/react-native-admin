import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@jazasoft/react-native-admin';

export default function MyApp() {
  const [result, setResult] = React.useState<number | undefined>(21);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button
        label="Click"
        onPress={() => setResult(Math.round(Math.random() * 100))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
