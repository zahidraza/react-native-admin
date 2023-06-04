import * as React from 'react';
import { ErrorBoundary as RErrorBoundary } from 'react-error-boundary';
import { View, StyleSheet, Button, Text } from 'react-native';

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.log({ error, info });
  // Do something with the error
  // E.g. reporting errorr using sentry ( see part 3)
};
function ErrorFallback(props: any) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong: </Text>
        <Button title="try Again" onPress={props.resetErrorBoundary} />
      </View>
    </View>
  );
}
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <RErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </RErrorBoundary>
);

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
  },
});
