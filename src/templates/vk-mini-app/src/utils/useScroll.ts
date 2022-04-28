import * as React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

export default (): {
  scrollToTop: VoidFunction;
  scrollTo: (scrollY: number) => void;
} => {
  const scrollElement = React.useRef<Element | null>(null);

  React.useEffect(() => {
    scrollElement.current =
      document.getElementsByClassName('vkuiAppRoot')?.[0] ?? null;
  }, []);

  const scrollToTop = React.useCallback(() => {
    scrollElement.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const scrollTo = React.useCallback((scrollY: number) => {
    scrollElement.current?.scrollTo({
      top: scrollY,
      behavior: 'smooth',
    });
  }, []);

  return {
    scrollToTop,
    scrollTo,
  };
};
