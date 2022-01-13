import * as Sentry from '@sentry/react';
import * as React from 'react';

import styles from './ErrorBoundary.modules.scss';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });

    if (window.is_production) {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          Произошла ошибка! Попробуйте обновить страницу
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
