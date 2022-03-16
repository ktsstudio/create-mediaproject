import * as path from 'path';
import * as fs from 'fs';

import { watch } from 'chokidar';

import { PATHS } from './config';
import { OptionsType, FSWatchType, FSProps } from './types';
import { saveFile, removeFile } from './fs';

const buildWatchFSProps = (
  options: OptionsType,
  entryPath: string
): FSProps => {
  const entryPathArray = entryPath.split('/');
  const entryName = entryPathArray[entryPathArray.length - 1];
  const templateBasePath = path.join(PATHS.templates, options.templateName);
  const [, projectRelativePathWithName] = entryPath.split(templateBasePath);
  const [projectRelativePath] = projectRelativePathWithName.split(entryName);
  const rootDir = path.resolve(__dirname, '..');

  const projectBuildPath = path.join(
    rootDir,
    options.buildDir,
    projectRelativePath
  );

  return {
    options,
    entryName,
    entryPath,
    projectBuildPath,
    isWatch: true,
  };
};

const watchOptionsConfig = {
  ignored: ['**/node_modules'],
};

export const watchAddFile: FSWatchType = ({ options, fullPath }) => {
  return watch(fullPath, watchOptionsConfig).on('add', (entryPath, stats) => {
    if (!stats) {
      const saveFileProps = buildWatchFSProps(options, entryPath);
      saveFile(saveFileProps);
    }
  });
};

export const watchChangeFile: FSWatchType = ({ options, fullPath }) => {
  return watch(fullPath, watchOptionsConfig).on('change', (entryPath) => {
    const saveFileProps = buildWatchFSProps(options, entryPath);
    saveFile(saveFileProps);
  });
};

export const watchUnlinkFile: FSWatchType = ({ options, fullPath }) => {
  return watch(fullPath, watchOptionsConfig).on('unlink', (entryPath) => {
    const removeFileProps = buildWatchFSProps(options, entryPath);
    removeFile(removeFileProps);
  });
};

export const watchAddDir: FSWatchType = ({ options, fullPath }) => {
  return watch(fullPath, watchOptionsConfig).on(
    'addDir',
    (entryPath, stats) => {
      if (stats) {
        return;
      }
      const { projectBuildPath, entryName } = buildWatchFSProps(
        options,
        entryPath
      );
      const dirPath = path.join(projectBuildPath, entryName);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    }
  );
};
