import * as React from 'react';
import isEqual from 'fast-deep-equal';

export const useDeepEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) => {
  // use a ref to keep track of deps across renders
  const depsRef = React.useRef<React.DependencyList>();

  // if the new deps don't deep equal the prev ones
  // stored in the ref, update the ref. If they *do*
  // deep equal, the ref will remain unchanged and
  // the array passed to `useEffect` will be the exact
  // same array as before so the basic strict equality
  // will work
  if (!depsRef || !isEqual(depsRef.current, deps)) {
    depsRef.current = deps;
  }

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  React.useEffect(effect, depsRef.current);
};
