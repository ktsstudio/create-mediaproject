import * as fs from 'fs';

import { cd, exec, ShellString } from 'shelljs';

import { OptionsType } from './types';
import { INITIAL_BRANCH, PATHS, COMMANDS, MESSAGES } from './config';

export const installDeps = (): void => {
  const isNode = fs.existsSync(PATHS.package);
  if (!isNode) {
    return;
  }

  const result = exec(COMMANDS.yarn.install);
  if (result.code !== 0) {
    throw new Error(MESSAGES.yarnInstallFail);
  }
};

export const initGit = (branch = INITIAL_BRANCH): ShellString =>
  exec(COMMANDS.git.init(branch));

export const postProcess = (options: OptionsType): void => {
  cd(options.buildDir);

  initGit();
  installDeps();
};
