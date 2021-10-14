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

  componentDidCatch() {
    this.setState({ hasError: true });
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
