import * as React from 'react';

export function useSafeState<T>(initialState: T) {
  const [state, setState] = React.useState<T>(initialState);

  const safeSetState = React.useCallback(
    (args) => {
      setState((prevState) => {
        return { ...prevState, ...args };
      });
    },
    [setState]
  );

  return [state, safeSetState];
}
