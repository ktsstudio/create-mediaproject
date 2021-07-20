export const routes = {
  onboarding: {
    view: 'onboarding',
    index: 'onboarding_index',
  },
};

export const buildUrl = (view: string, panel: string): string =>
  `/${view}/${panel}`;
