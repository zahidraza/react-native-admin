import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, Button } from '@jazasoft/react-native-admin';

export default function MyApp() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button label="Click" onPress={() => console.log('button clicked')} />
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
