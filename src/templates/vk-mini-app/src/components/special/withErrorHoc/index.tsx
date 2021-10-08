import * as React from 'react';

import ErrorBoundary from './ErrorBoundary';

export const withErrorHoc =
  (PageComponent: React.FC) => (props: React.ComponentProps<any>) => {
    return (
      <ErrorBoundary>
        <PageComponent {...props} />
      </ErrorBoundary>
    );
  };

export default withErrorHoc;
