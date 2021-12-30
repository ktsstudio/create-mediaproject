import * as React from 'react';

import ErrorBoundary from './ErrorBoundary';

export const withError =
  (PageComponent: React.FC<React.ComponentProps<any>>) =>
  (props: React.ComponentProps<any>) => {
    return (
      <ErrorBoundary>
        <PageComponent {...props} />
      </ErrorBoundary>
    );
  };

export default withError;
