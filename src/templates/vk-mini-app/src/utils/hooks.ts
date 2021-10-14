import * as React from 'react';

export const useEventListener = (
  target:
    | React.MutableRefObject<any>
    | HTMLElement
    | Window
    | Document = window,
  type: string,
  listener: EventListenerOrEventListenerObject,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ...options: any
): void => {
  React.useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    const targetIsRef = target.hasOwnProperty('current');
    // @ts-ignore
    const currentTarget = targetIsRef ? target?.current : target;
    if (currentTarget) {
      currentTarget.addEventListener(type, listener, ...options);
    }
    return (): void => {
      if (currentTarget) {
        currentTarget.removeEventListener(type, listener, ...options);
      }
    };
  }, [target, type, listener, options]);
};
