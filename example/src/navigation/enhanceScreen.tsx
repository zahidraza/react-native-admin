import * as React from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import FocusAndThemeAwareStatusBar from '../components/StatusBar';
import ErrorBoundary from '../components/ErrorBoundary';

const enhanceScreen = (Component: any, props?: any) => {
  return (innerProps: any) => {
    const orientation = useDeviceOrientation();
    return (
      <ErrorBoundary>
        <FocusAndThemeAwareStatusBar />
        <Component {...innerProps} {...props} {...orientation} />
      </ErrorBoundary>
    );
  };
};

export default enhanceScreen;
