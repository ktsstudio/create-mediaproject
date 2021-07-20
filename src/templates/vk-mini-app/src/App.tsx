import { Provider } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from 'pages/Root';
import Splash from 'pages/Splash';
import stores from 'store/index';

import './styles/styles.scss';
import '@vkontakte/vkui/dist/vkui.css';

const App: React.FC = () => {
  const [appReady, setAppReady] = React.useState(false);

  const handleAppReady = () => {
    setAppReady(true);
  };

  return (
    <Router>
      <Provider {...stores}>
        {!appReady && <Splash onReady={handleAppReady} />}
        {appReady && <Root />}
      </Provider>
    </Router>
  );
};

export default App;
