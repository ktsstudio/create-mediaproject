import bridge from '@vkontakte/vk-bridge';
import { useLocation, useHistory } from 'react-router';

import { routes, ViewEnum, PanelEnum } from 'config/routes';
import {
  UseVKRouterType,
  UseVKViewsType,
  ViewsRecord,
  BuildUrlType,
  BuildLocationType,
} from 'types/routes';

export const buidViewId = (view: ViewEnum | string) => `view-${view}`;
export const buidPanelId = (panel: PanelEnum | string) => `panel-${panel}`;

export const useView = (): [string, string] => {
  const { pathname } = useLocation();
  const [, view, panel] = pathname.split('/');
  return [view, panel];
};

const buildUrl: BuildUrlType = (view, panel) => `/${view}/${panel}`;

const buildLocation: BuildLocationType = (route, onLoad = false) => {
  const { view, panel } = route;
  return {
    pathname: buildUrl(view, panel),
    state: onLoad ? 'start' : 'canSwipeBack',
  };
};

export const useVKRouter: UseVKRouterType = () => {
  const history = useHistory();
  return (panelKey, onLoad = false) => {
    const panel = routes[panelKey];
    const location = buildLocation(panel, onLoad);
    onLoad ? history.replace(location) : history.push(location);
  };
};

export const useVKViews: UseVKViewsType = (config) => {
  const { routes, defaultPanel } = config;

  const views = Object.keys(routes).reduce((prevRoutes, panelKey) => {
    const panel = routes[panelKey];
    const viewPanels = prevRoutes[panel.view];
    const key = panel.view;
    const value = viewPanels ? [...viewPanels, panel] : [panel];
    return { ...prevRoutes, [key]: value };
  }, {}) as ViewsRecord;

  const defaultRoute = routes[defaultPanel];
  return { views, defaultRoute };
};

export const onSwipeBack = (): void => {
  const history = useHistory();

  if (history.location.state === 'start') {
    if (bridge.supports('VKWebAppDisableSwipeBack')) {
      bridge.send('VKWebAppDisableSwipeBack');
    }
    return;
  }

  if (bridge.supports('VKWebAppEnableSwipeBack')) {
    bridge.send('VKWebAppEnableSwipeBack');
    history.goBack();
  }
};
