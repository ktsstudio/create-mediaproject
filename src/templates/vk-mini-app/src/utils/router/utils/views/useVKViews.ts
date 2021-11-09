import * as React from 'react';

import config from 'config/routes';
import { VKRouteType } from 'config/routes/types';

import { UseVKViewsType, VKViewsType } from './types';

// получение списка вьюшек со списком панелей для каждой
export const useVKViews: UseVKViewsType = () => {
  const [views] = React.useState(
    () =>
      Object.values(config.routes).reduce(
        (viewRoutes, { panel, view }: VKRouteType) => ({
          ...viewRoutes,
          [view]: viewRoutes[view] ? [...viewRoutes[view], panel] : [panel],
        }),
        {}
      ) as VKViewsType
  );

  return [views];
};
