import 'regenerator-runtime/runtime';
import { markup } from '@ktsstudio/mediaproject-utils';
import { initializeVkApp } from '@ktsstudio/mediaproject-vk';
import bridge from '@vkontakte/vk-bridge';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';

import App from './App';

const markupConfig = {
  width: 1280,
  height: 820,
  mobileWidth: 375,
  mobileHeight: 667,
  initScale: 10,
  maxAspect: 1,
  minAspect: 1,
  maxFontSize: null,
};

const startApp = () => {
  initializeVkApp();
  markup(markupConfig).init();
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

  // fix for :active
  document.addEventListener('touchstart', () => {}, false);

  window.onload = () => {
    ReactDOM.render(<App />, document.querySelector('#root'));
  };
};

startApp();
