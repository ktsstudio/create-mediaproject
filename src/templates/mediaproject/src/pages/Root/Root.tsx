import { observer } from 'mobx-react';
import * as React from 'react';
import { useRoutes } from 'react-router';

import { RouteEnum } from 'config/routes';
import Home from 'pages/Home/Home';
import Start from 'pages/Start/Start';

const Root: React.FC = () => {
  return useRoutes([
    {
      path: RouteEnum.home,
      element: <Home />,
    },
    {
      path: RouteEnum.start,
      element: <Start />,
    },
  ]);
};

export default observer(Root);
