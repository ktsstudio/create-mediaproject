import 'regenerator-runtime/runtime';
import { markup } from '@ktsstudio/mediaproject-style';
import { fixActive } from '@ktsstudio/mediaproject-utils';
import {
  initializeVkApp,
  setSwipeSettings,
  setViewSettings,
} from '@ktsstudio/mediaproject-vk';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';

import App from './App';

const startApp = () => {
  initializeVkApp();

  markup(false).init();

  setSwipeSettings();
  setViewSettings();

  fixActive();

  ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = () => {
  setTimeout(startApp, 500);
};
