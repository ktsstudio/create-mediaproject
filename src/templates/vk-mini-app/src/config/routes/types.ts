import * as React from 'react';

import { ViewEnum, PanelEnum } from './index';

export type VKRouteType = {
  panel: PanelEnum;
  view: ViewEnum;
  Component: React.FC;
  fixedHeight?: boolean;
};

export type VKRoutesRecord = Record<PanelEnum, VKRouteType>;

export type VKRoutesConfigType = {
  routes: VKRoutesRecord;
  defaultPanel: PanelEnum;
};
