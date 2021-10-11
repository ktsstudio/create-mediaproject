import { VKRoutesRecord, VKRoutesConfigType } from 'types/routes';

export enum ViewEnum {
  onboarding,
  main,
  first,
  second,
}

export enum PanelEnum {
  onboarding,
  main,
  firstFirst,
  firstSecond,
  secondFirst,
  secondSecond,
}

export const routes: VKRoutesRecord = {
  [PanelEnum.onboarding]: {
    panel: PanelEnum.onboarding,
    view: ViewEnum.onboarding,
    Component: require('pages/Onboarding').default,
  },
  [PanelEnum.main]: {
    panel: PanelEnum.main,
    view: ViewEnum.main,
    Component: require('pages/Main').default,
  },
  [PanelEnum.firstFirst]: {
    panel: PanelEnum.firstFirst,
    view: ViewEnum.first,
    Component: require('pages/FirstViewFirstPanel').default,
  },
  [PanelEnum.firstSecond]: {
    panel: PanelEnum.firstSecond,
    view: ViewEnum.first,
    Component: require('pages/FirstViewSecondPanel').default,
  },
  [PanelEnum.secondFirst]: {
    panel: PanelEnum.secondFirst,
    view: ViewEnum.second,
    Component: require('pages/SecondViewFirstPanel').default,
  },
  [PanelEnum.secondSecond]: {
    panel: PanelEnum.secondSecond,
    view: ViewEnum.second,
    Component: require('pages/SecondViewSecondPanel').default,
  },
};

const config: VKRoutesConfigType = {
  routes,
  defaultPanel: PanelEnum.onboarding,
};

export default config;
