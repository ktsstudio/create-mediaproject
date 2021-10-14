import * as path from 'path';

import { MESSAGES, PATHS } from './config';
import { OptionsType } from './types';
import { printSuccess } from './utils/print';
import { postDevModeProcess } from './postProcess';
import { watchAddFile, watchChangeFile, watchUnlinkFile } from './fsWatch';

const buildFullTemplatePath = (templateName: string) =>
  path.join(__dirname, PATHS.templates, templateName);

export const devMode = (options: OptionsType): void => {
  printSuccess(MESSAGES.devModeRunning);

  const watchProps = {
    options,
    fullPath: buildFullTemplatePath(options.templateName),
  };

  watchAddFile(watchProps);
  watchChangeFile(watchProps);
  watchUnlinkFile(watchProps);

  postDevModeProcess();
};
