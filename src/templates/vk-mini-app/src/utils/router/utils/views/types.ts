import { PanelEnum, ViewEnum } from 'config/routes';

export type VKViewsType = [ViewEnum, PanelEnum[]][];
export type UseVKViewsType = () => VKViewsType;
