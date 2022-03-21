import * as fs from 'fs';
import * as path from 'path';

import * as ejs from 'ejs';
import { exec } from 'shelljs';

import { FSType } from './types';
import { printWarning } from './utils/print';
import { buildTemplateVariables } from './utils/template';
import { ENCODING, REGEXP, DEV_MESSAGES, COMMANDS, PATHS } from './config';
import { createDirectoryContents } from './createProject';

export const saveFile: FSType = ({
  options,
  entryName,
  entryPath,
  projectBuildPath,
  isWatch = false,
}) => {
  const readFileBuffer = () => fs.readFileSync(entryPath);
  const readTemplateString = () => fs.readFileSync(entryPath, ENCODING);

  const templateString = readTemplateString();
  const templateVariables = buildTemplateVariables(options);
  const renderTemplate = () => ejs.render(templateString, templateVariables);

  const writeFileName = entryName.replace(REGEXP.template, '');
  const fullFilePath = path.join(projectBuildPath, writeFileName);

  const isTemplate = Boolean(entryName.match(REGEXP.template));
  const dataToWrite = isTemplate ? renderTemplate() : readFileBuffer();

  fs.writeFileSync(fullFilePath, dataToWrite);

  if (isWatch) {
    printWarning(DEV_MESSAGES.watchWrite(entryName, writeFileName, isTemplate));
  }
};

export const removeFile: FSType = ({ projectBuildPath, entryName }) => {
  const removeFileName = entryName.replace(REGEXP.template, '');
  const fullFilePath = path.join(projectBuildPath, removeFileName);
  if (fs.existsSync(fullFilePath)) {
    fs.unlinkSync(fullFilePath);
    printWarning(DEV_MESSAGES.watchRemove(removeFileName));
  }
};

export const saveDirectory: FSType = ({
  options,
  entryName,
  entryPath,
  projectBuildPath,
}) => {
  const buildDirPath = (parentPath: string) => path.join(parentPath, entryName);

  fs.mkdirSync(buildDirPath(projectBuildPath));
  createDirectoryContents(options, buildDirPath(entryPath));
};

export const removeDirectory = (dirPath: string): void => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true });
  }
};

export const symlinkDirectory = (
  fromPath: string,
  toPath: string,
  callback: fs.NoParamCallback
): void => {
  fs.symlink(fromPath, toPath, callback);
};

export const removeTemporaryDevDir = (
  fullRootDir: string,
  templatePath: string
): void => {
  exec(COMMANDS.dev.rmSymlinkModules(templatePath), { async: true });
  exec(COMMANDS.dev.rmTemporaryDir(fullRootDir), { async: true });
};

export const buildFullTemplatePath = (templateName: string): string =>
  path.join(__dirname, PATHS.templates, templateName);

export const buildParentPath = (): string => path.join(__dirname, '..');
