import * as path from 'path';

import { exec } from 'shelljs';

import { MESSAGES, PATHS, COMMANDS } from './config';
import { OptionsType } from './types';
import { printSuccess } from './utils/print';
import {
  watchAddFile,
  watchChangeFile,
  watchUnlinkFile,
  watchAddDir,
} from './fsWatch';
import {
  buildFullTemplatePath,
  buildParentPath,
  removeTemporaryDevDir,
  symlinkDirectory,
} from './fs';

const devModeChildProcess = (options: OptionsType): void => {
  exec(COMMANDS.yarn.dev, { async: true });
  process.on('SIGINT', () => {
    printSuccess(MESSAGES.devModeExit);
    removeTemporaryDevDir(
      buildParentPath(),
      buildFullTemplatePath(options.templateName)
    );
    process.exit(0);
  });
};

export const devMode = (options: OptionsType): void => {
  symlinkDirectory(
    path.join(buildParentPath(), PATHS.devModeDir, PATHS.modules),
    path.join(options.templatePath, PATHS.modules),
    () => printSuccess(MESSAGES.devModeSymlinkCreated)
  );

  const watchProps = {
    options,
    fullPath: buildFullTemplatePath(options.templateName),
  };

  watchAddFile(watchProps);
  watchChangeFile(watchProps);
  watchUnlinkFile(watchProps);
  watchAddDir(watchProps);

  devModeChildProcess(options);

  printSuccess(MESSAGES.devModeRunning);
};
