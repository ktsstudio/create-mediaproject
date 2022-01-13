import { Provider } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from 'pages/Root';
import stores from 'store/index';

const App: React.FC = () => {
  return (
    <Router>
      <Provider {...stores}>
        <Root />
      </Provider>
    </Router>
  );
};

export default App;
