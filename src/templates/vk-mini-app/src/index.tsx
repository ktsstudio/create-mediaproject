import 'regenerator-runtime/runtime';
import { markup, noop } from '@ktsstudio/mediaproject-utils';
import { initializeVkApp } from '@ktsstudio/mediaproject-vk';
import bridge from '@vkontakte/vk-bridge';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';

import App from './App';

const startApp = () => {
  initializeVkApp();
  markup().init();
  if (bridge.supports('VKWebAppSetViewSettings') && window.is_ios) {
    bridge.send('VKWebAppSetViewSettings', {
      status_bar_style: 'light',
      action_bar_color: '#DC2129',
      navigation_bar_color: '#DC2129',
    });
  }
  if (bridge.supports('VKWebAppSetSwipeSettings')) {
    bridge.send('VKWebAppSetSwipeSettings', { history: true });
  }

  // fix for :active
  document.addEventListener('touchstart', noop, false);

  ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = () => {
  setTimeout(startApp, 500);
};
