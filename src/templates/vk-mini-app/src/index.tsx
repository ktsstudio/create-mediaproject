import 'regenerator-runtime/runtime';
import bridge from '@vkontakte/vk-bridge';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import checkIOS from 'utils/checkIOS';
import findGetParameter from 'utils/findGetParameter';
import markup from 'utils/markup';

import App from './App';

const startApp = () => {
  window.search = location.search;
  window.app_id = Number(findGetParameter('vk_app_id'));
  window.scope = findGetParameter('vk_access_token_settings');
  window.user_id = findGetParameter('vk_user_id');
  window.PLATFORM = findGetParameter('vk_platform') || 'desktop_web';
  window.IS_MOBILE = window.PLATFORM !== 'desktop_web';
  window.IS_PRODUCTION = process.env.NODE_ENV === 'production';
  window.LOCATION_HASH = location.hash;
  window.page = findGetParameter('page', window.LOCATION_HASH);
  window.group_id = findGetParameter('group_id');

  bridge.send('VKWebAppInit', {});
  markup.init();

  if (bridge.supports('VKWebAppSetViewSettings')) {
    bridge.send('VKWebAppSetViewSettings', {
      status_bar_style: 'light',
      action_bar_color: '#DC2129',
      navigation_bar_color: '#DC2129',
    });
  }

  if (bridge.supports('VKWebAppSetSwipeSettings')) {
    // @ts-ignore
    bridge.send('VKWebAppSetSwipeSettings', {});
  }

  checkIOS(window.PLATFORM);

  // if (window.IS_PRODUCTION) {
  //   Sentry.init({
  //     dsn:
  //       '',
  //   });
  // }

  // if (window.IS_PRODUCTION) {
  //   Sentry.configureScope((scope) => {
  //     scope.setTag('user_id', String(window.user_id));
  //   });
  // }

  // fix for :active
  document.addEventListener('touchstart', () => {}, false);

  ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = () => {
  setTimeout(startApp, 500);
};
