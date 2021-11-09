import { useLocation } from 'react-router';

import config from 'config/routes';

import { VKLocationStateType, VKLocationType } from './types';

// текущий локейшн - вью, панель, модалка, canSwipeBack, роут, стейт
// если в локейшене не обнаружена панелька, берется дефолтная из конфига
export function useVKLocation<
  LocationStateType = VKLocationStateType
>(): VKLocationType<LocationStateType> {
  const { pathname, state } = useLocation<
    LocationStateType & VKLocationStateType
  >();
  const [, , locationPanel] = pathname.split('/');

  const route = config.routes[locationPanel || config.defaultPanel];

  return {
    view: route.view,
    panel: route.panel,
    modal: state?.modal,
    canSwipeBack: state?.canSwipeBack || true,
    route,
    state,
  };
}
