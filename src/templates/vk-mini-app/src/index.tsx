import 'regenerator-runtime/runtime';
import { markup } from '@ktsstudio/mediaproject-style';
import { fixActive } from '@ktsstudio/mediaproject-utils';
import {
  initializeVkApp,
  setSwipeSettings,
  setViewSettings,
} from '@ktsstudio/mediaproject-vk';
import * as eruda from 'eruda'; // todo: закомментировать перед запуском в прод
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';

import App from './App';

const startApp = () => {
  initializeVkApp();

  markup(false, { width: 375, height: 812 }).init();

  setSwipeSettings();
  setViewSettings();

  fixActive();

  // todo: закомментировать перед запуском в прод
  if (window.is_dev) {
    eruda.init();
  }

  ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = () => {
  setTimeout(startApp, 500);
};
