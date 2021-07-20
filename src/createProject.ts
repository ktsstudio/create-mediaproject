import * as fs from 'fs';
import * as path from 'path';

import * as ejs from 'ejs';
import chalk from 'chalk';

import { OptionsType } from './parseOptions';

const SKIP_FILES: string[] = [];

export const saveFile = (
  fileName: string,
  fileTemplatePath: string,
  fileSavePath: string,
  options: OptionsType
): void => {
  const contents = fs.readFileSync(fileTemplatePath, 'utf8');

  const isTemplate = fileName.indexOf('.template') !== -1;

  const saveFileName = isTemplate
    ? fileName.replace('.template', '')
    : fileName;

  const saveContents = isTemplate ? ejs.render(contents, options) : contents;

  const writePath = path.join(fileSavePath, saveFileName);
  fs.writeFileSync(writePath, saveContents, 'utf8');
};

export const createDirectoryContents = (
  currentRelativePath: string,
  options: OptionsType
): void => {
  const currentFullTemplatePath = path.join(
    options.templatePath,
    currentRelativePath
  );
  const currentFullTargetPath = path.join(
    options.fullProjectPath,
    currentRelativePath
  );
  const filesToCreate = fs.readdirSync(currentFullTemplatePath);

  filesToCreate.forEach((file) => {
    const filePath = path.join(currentFullTemplatePath, file);

    const stats = fs.statSync(filePath);

    if (SKIP_FILES.indexOf(file) > -1) {
      return;
    }

    if (stats.isFile()) {
      saveFile(file, filePath, currentFullTargetPath, options);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(currentFullTargetPath, file));
      createDirectoryContents(path.join(currentRelativePath, file), options);
    }
  });
};

export const createProject = (options: OptionsType): void => {
  if (fs.existsSync(options.fullProjectPath)) {
    console.log(
      chalk.red(
        'Project with this name already created, please delete folder or rename project'
      )
    );
    throw new Error('Project exists');
  }

  fs.mkdirSync(options.fullProjectPath);

  createDirectoryContents('', options);
};
