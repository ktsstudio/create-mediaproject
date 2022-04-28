import { VKRoutesRecord, VKRoutesConfigType } from './types';

export enum ViewEnum {
  onboarding = 'onboarding',
  main = 'main',
}

export enum PanelEnum {
  onboarding = 'onboarding',
  main = 'main',
  mainSecond = 'mainSecond',
}

export enum ModalEnum {
  greeting = 'greeting',
}

export const routes: VKRoutesRecord = {
  [PanelEnum.onboarding]: {
    panel: PanelEnum.onboarding,
    view: ViewEnum.onboarding,
    Component: require('pages/Onboarding').default,
    fixedHeight: true,
  },
  [PanelEnum.main]: {
    panel: PanelEnum.main,
    view: ViewEnum.main,
    Component: require('pages/Main').default,
  },
  [PanelEnum.mainSecond]: {
    panel: PanelEnum.mainSecond,
    view: ViewEnum.main,
    Component: require('pages/MainSecond').default,
  },
};

const config: VKRoutesConfigType = {
  routes,
  defaultPanel: PanelEnum.onboarding,
};

export default config;
