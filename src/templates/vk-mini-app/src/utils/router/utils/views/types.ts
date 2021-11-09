import { PanelEnum, ViewEnum } from 'config/routes';

export type VKViewsType = Record<ViewEnum, PanelEnum[]>;
export type UseVKViewsType = () => [VKViewsType];
