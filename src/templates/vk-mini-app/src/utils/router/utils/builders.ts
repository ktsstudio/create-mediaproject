import { LocationDescriptor } from 'history';

import { routes, PanelEnum } from 'config/routes';

import { VKLocationParams, VKLocationStateType } from '../location/types';

// билдит урл текущий страницы, получая вьюшку текущей панели из конфига
export function buildVKPathname(panel: PanelEnum): string {
  return `/${routes[panel].view}/${panel}`;
}

// билдит локейшн по панели, добавляя
// в стейте модалку, canSwipeBack и что-то еще, если понадобится
export function buildVKLocation<LocationStateType>({
  panel,
  modal = undefined,
  canSwipeBack = true,
  state = undefined,
}: VKLocationParams<LocationStateType>): LocationDescriptor<
  LocationStateType | VKLocationStateType
> {
  const config = {
    pathname: buildVKPathname(panel),
    state: {
      modal,
      canSwipeBack,
    },
  };

  if (state) {
    config.state = { ...config.state, ...state };
  }

  return config;
}
