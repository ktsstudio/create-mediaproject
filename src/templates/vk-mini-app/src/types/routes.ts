import { LocationDescriptor } from 'history';
import * as React from 'react';

import { ViewEnum, PanelEnum } from 'config/routes';

export type VKRouteType = {
  panel: PanelEnum;
  view: ViewEnum;
  Component: React.FC;
};

export type VKRoutesRecord = Record<PanelEnum, VKRouteType>;

export type VKRoutesConfigType = {
  routes: VKRoutesRecord;
  defaultPanel: PanelEnum;
};

export type ViewsRecord = Record<ViewEnum, VKRouteType[]>;
export type VKViewsType = {
  views: ViewsRecord;
  defaultRoute: VKRouteType;
};
export type UseVKViewsType = (routes: VKRoutesConfigType) => VKViewsType;

export type PushPanelType = (panelKey: PanelEnum, onLoad?: boolean) => void;
export type UseVKRouterType = () => PushPanelType;

export type BuildUrlType = (view: ViewEnum, panel: PanelEnum) => string;
export type BuildLocationType = (
  panel: VKRouteType,
  onLoad?: boolean
) => LocationDescriptor<string>;
