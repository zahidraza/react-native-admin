import * as React from 'react';

import { Text } from 'react-native';
import { multiply, App } from 'react-native-admin';

export default function MyApp() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <App>
      <Text>Result: {result}</Text>
    </App>
  );
}
