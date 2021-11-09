import { ConfigProvider } from '@vkontakte/vkui';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

import Root from 'pages/Root';
import stores from 'store/index';
import { useVKViews } from 'utils/router';

import './styles/styles.scss';

const App: React.FC = () => {
  const Router: any = window.is_odr ? MemoryRouter : BrowserRouter;
  const [views] = useVKViews();

  return (
    <ConfigProvider transitionMotionEnabled={false}>
      <Router>
        <Provider {...stores}>
          <Root views={views} />
        </Provider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
