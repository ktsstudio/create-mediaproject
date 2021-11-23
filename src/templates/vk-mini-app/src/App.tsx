import { ConfigProvider } from '@vkontakte/vkui';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

import Root from 'pages/Root';
import stores from 'store/index';

import './styles/styles.scss';

const App: React.FC = () => {
  const Router: any = window.is_odr ? MemoryRouter : BrowserRouter;

  return (
    <ConfigProvider transitionMotionEnabled={false}>
      <Router>
        <Provider {...stores}>
          <Root />
        </Provider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
