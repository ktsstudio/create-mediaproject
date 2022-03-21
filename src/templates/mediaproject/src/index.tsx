import { markup } from '@ktsstudio/mediaproject-style';
import { fixActive, initializeAppParams } from '@ktsstudio/mediaproject-utils';
import * as Sentry from '@sentry/react';
import * as eruda from 'eruda'; // todo: закомментировать перед запуском в прод
import * as React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import './styles/styles.scss';

const startApp = () => {
  initializeAppParams();

  markup().init();

  if (window.is_production) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      normalizeDepth: 6,
    });
  }

  fixActive();

  // todo: закомментировать перед запуском в прод
  if (window.is_dev) {
    eruda.init();
  }

  render(<App />, document.getElementById('root'));
};

startApp();
