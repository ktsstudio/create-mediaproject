import * as React from 'react';

import { routes } from 'config/routes';
import { VKRouteType } from 'config/routes/types';

import { UseVKViewsType, VKViewsType } from './types';

// получение списка вьюшек со списком панелей для каждой
// возвращает массив пар, где первое значение - вьюшка, а второе - массив панелей вьюшки
// формат возвращаемых данных - [view, viewPanels][]
export const useVKViews: UseVKViewsType = (): VKViewsType => {
  const [views] = React.useState(
    () =>
      Object.entries(
        Object.values(routes).reduce(
          (viewRoutes, { panel, view }: VKRouteType) => ({
            ...viewRoutes,
            [view]: viewRoutes[view] ? [...viewRoutes[view], panel] : [panel],
          }),
          {}
        )
      ) as VKViewsType
  );

  return views;
};
