import * as React from 'react';

import { Text } from 'react-native';
import { multiply, App, Button } from '@jazasoft/react-native-admin';

export default function MyApp() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <App>
      <Text>Result: {result}</Text>
      <Button label="Click" onPress={() => console.log('button clicked')} />
    </App>
  );
}
