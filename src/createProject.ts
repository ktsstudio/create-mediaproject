import * as fs from 'fs';
import * as path from 'path';

import * as ejs from 'ejs';
import chalk from 'chalk';

import { OptionsType } from './parseOptions';

const SKIP_FILES: string[] = [];
const ENCODING = 'utf-8';
const TEMPLATE_REGEXP = /\.template/;

export const saveFile = (
  fileName: string,
  templateFilePath: string,
  projectFilePath: string,
  options: OptionsType
): void => {
  const readFileBuffer = () => fs.readFileSync(templateFilePath);

  const readTemplate = () => fs.readFileSync(templateFilePath, ENCODING);
  const renderTemplate = () => ejs.render(readTemplate(), options);

  const isTemplate = fileName.match(TEMPLATE_REGEXP);

  const writeFileName = isTemplate
    ? fileName.replace(TEMPLATE_REGEXP, '')
    : fileName;

  const writeData = isTemplate ? renderTemplate() : readFileBuffer();
  const writePath = path.join(projectFilePath, writeFileName);

  const stats = fs.statSync(templateFilePath);

  fs.writeFileSync(writePath, writeData, { mode: stats.mode });
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
