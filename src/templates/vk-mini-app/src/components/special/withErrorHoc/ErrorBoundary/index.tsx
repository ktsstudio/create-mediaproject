import * as Sentry from '@sentry/browser';
import * as React from 'react';

import './ErrorBoundary.scss';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
    if (window.IS_PRODUCTION) {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          Произошла ошибка! Перезагрузите приложение или попробуйте позже
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
