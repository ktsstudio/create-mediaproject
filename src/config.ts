export const ENCODING = 'utf-8';
export const INITIAL_BRANCH = 'main';

export const REGEXP = {
  template: /\.template/,
  fsEntryName: /^([A-Za-z\-_\d])+$/,
};

export const PATHS = {
  package: 'package.json',
  templates: 'templates',
  devModeDir: 'dev',
  src: 'src',
};

export const SKIP_FILENAMES: string[] = ['.DS_Store', '.git'];

export const MESSAGES = {
  buildDirExists:
    'Project with this name already created, please delete folder or rename project',
  projectCreateSuccess: (templateName: string, projectName: string): string =>
    `Project ${projectName} was created successfully from template ${templateName}!`,
  projectCreateError: 'Error while creating project',
  yarnInstallFail: 'Yarn install failed',
  devModeStarts: 'dev',
  devModeCreateSuccess: (templateName: string, projectName: string): string =>
    `Dev mode was created successfully from template ${templateName} @ ./${projectName}`,
  devModeRunning: 'Dev mode is running',
};

export const DEV_MESSAGES = {
  watchWrite: (
    entryName: string,
    writeFileName: string,
    isTemplate: boolean
  ): string =>
    `${entryName}${isTemplate ? ` >> ${writeFileName}` : ''} {write} [watch]`,
  watchRemove: (entryName: string): string => `${entryName} {remove} [watch]`,
};

export const COMMANDS = {
  yarn: {
    install: 'yarn install',
    dev: 'yarn dev',
  },
  git: {
    init: (branch: string): string => `git init --initial-branch ${branch}`,
  },
};
