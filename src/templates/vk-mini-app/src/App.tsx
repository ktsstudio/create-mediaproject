import { ConfigProvider } from '@vkontakte/vkui';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

import routes from 'config/routes';
import Root from 'pages/Root';
import stores from 'store/index';
import { useVKViews } from 'utils/useVKViews';

import './styles/styles.scss';

const App: React.FC = () => {
  const Router: any = window.is_odr ? MemoryRouter : BrowserRouter;
  const [views] = React.useState(() => useVKViews(routes));

  return (
    <ConfigProvider transitionMotionEnabled={false}>
      <Router>
        <Provider {...stores}>
          <Root {...views} />
        </Provider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
