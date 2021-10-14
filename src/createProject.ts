import * as fs from 'fs';
import * as path from 'path';

import { OptionsType } from './types';
import { printError } from './utils/print';
import { MESSAGES, SKIP_FILENAMES } from './config';
import { saveDirectory, saveFile } from './fs';

export const createDirectoryContents = (
  options: OptionsType,
  relativePath = '',
  skipFileNames = SKIP_FILENAMES
): void => {
  const buildRelativePath = (parentPath: string) =>
    path.join(parentPath, relativePath);

  const projectBuildPath = buildRelativePath(options.buildDir);
  const fullTemplatePath = buildRelativePath(options.templatePath);
  const entriesToCreate = fs.readdirSync(fullTemplatePath);

  entriesToCreate.forEach((entryName) => {
    if (skipFileNames.includes(entryName)) {
      return;
    }

    const entryPath = path.join(fullTemplatePath, entryName);
    const stats = fs.statSync(entryPath);
    const isDirectory = stats.isDirectory();

    const saveProps = {
      entryPath: isDirectory ? relativePath : entryPath,
      options,
      entryName,
      projectBuildPath,
    };

    if (isDirectory) {
      return saveDirectory(saveProps);
    }

    if (stats.isFile()) {
      return saveFile(saveProps);
    }
  });
};

export const createProject = (options: OptionsType): void => {
  if (fs.existsSync(options.buildDir)) {
    printError(MESSAGES.buildDirExists);
    throw new Error(MESSAGES.buildDirExists);
  }

  fs.mkdirSync(options.buildDir);
  createDirectoryContents(options);
};
