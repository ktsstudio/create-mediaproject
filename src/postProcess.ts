import * as fs from 'fs';

import { cd, exec } from 'shelljs';

import { OptionsType } from './parseOptions';

export const installDeps = (): void => {
  const isNode = fs.existsSync('package.json');
  if (isNode) {
    const result = exec('yarn install');
    if (result.code !== 0) {
      throw new Error('Yarn install failed');
    }
  }
};

const INITIAL_BRANCH = 'main';
export const initGit = (): void => {
  exec(`git init --initial-branch ${INITIAL_BRANCH}`);
};

export function postProcess(options: OptionsType) {
  cd(options.fullProjectPath);

  initGit();
  installDeps();
}
