#!/usr/bin/env node

import { parseInitialOptions, parseOptions } from './parseOptions';
import { createProject } from './createProject';
import { postProcess } from './postProcess';
import { devMode } from './devMode';
import { printError, printSuccess } from './utils/print';
import { MESSAGES, PATHS } from './config';
import { InitialOptionsType } from './types';
import { removeDirectory } from './fs';

const buildTemplate = async (
  initialOptions: InitialOptionsType
): Promise<void> => {
  const options = await parseOptions(initialOptions);

  try {
    createProject(options);
    postProcess(options);
    printSuccess(
      MESSAGES.projectCreateSuccess(options.templateName, options.buildDir)
    );
  } catch (e) {
    printError(MESSAGES.projectCreateError);
  }
};

const startDevMode = async (
  initialOptions: InitialOptionsType
): Promise<void> => {
  const devModeOptions = {
    ...initialOptions,
    dir: PATHS.devModeDir,
  };

  const options = await parseOptions(devModeOptions);
  try {
    printSuccess(MESSAGES.devModeStarts);
    removeDirectory(devModeOptions.dir);
    createProject(options);
    postProcess(options);
    printSuccess(
      MESSAGES.devModeCreateSuccess(options.templateName, options.buildDir)
    );

    devMode(options);
  } catch (e) {
    printError(MESSAGES.projectCreateError);
  }
};

const main = async (): Promise<void> => {
  const initialOptions = parseInitialOptions();
  return initialOptions.dev
    ? startDevMode(initialOptions)
    : buildTemplate(initialOptions);
};

main();
