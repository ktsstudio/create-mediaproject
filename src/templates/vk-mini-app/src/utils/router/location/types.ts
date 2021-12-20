import { ModalEnum, PanelEnum, ViewEnum } from 'config/routes';
import { VKRouteType } from 'config/routes/types';

// текущий стейт текущего локейшена
export type VKLocationStateType = {
  modal?: ModalEnum;
  canSwipeBack?: boolean;
};

// параметры, из которых билдится новый локейшн
export type VKLocationParams<LocationStateType = void> = {
  // новая панель
  panel: PanelEnum;
  state?: LocationStateType;
} & VKLocationStateType;

// текущий локейшн
export type VKLocationType<LocationStateType = VKLocationStateType> =
  VKLocationStateType & {
    view: ViewEnum;
    panel: PanelEnum;
    route: VKRouteType;
    state: LocationStateType & VKLocationStateType;
  };
