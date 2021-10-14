import * as fs from 'fs';
import * as path from 'path';

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { prompt } from 'inquirer';

import { PATHS, REGEXP } from './config';
import { OptionsType, InitialOptionsType } from './types';

export const parseInitialOptions = (): InitialOptionsType => {
  const { argv } = yargs(hideBin(process.argv))
    .option('dir', {
      alias: 'd',
      description: 'Project directory (also name)',
      type: 'string',
    })
    .option('template', {
      alias: 't',
      description: 'Template name',
      type: 'string',
    })
    .option('dev', {
      description: 'Dev mode',
      type: 'boolean',
    })
    .help()
    .alias('help', 'h');

  return {
    dir: argv.dir,
    template: argv.template,
    dev: argv.dev || false,
  };
};

const validateDirectoryName = (dirName: string) =>
  REGEXP.fsEntryName.test(dirName);

const promptQuestions = {
  templateName: (choices: string[]) => ({
    name: 'templateName',
    type: 'list',
    message: 'Select template',
    choices,
  }),
  buildDir: {
    name: 'buildDir',
    type: 'input',
    message: 'Project directory (also name)',
    validate: (input: string) =>
      validateDirectoryName(input) ? true : 'Incorrect directory name',
  },
};

export const parseOptions = async (
  initialOptions: InitialOptionsType
): Promise<OptionsType> => {
  const templatesPath = path.join(__dirname, PATHS.templates);
  const choices = fs.readdirSync(templatesPath);

  const questions = [
    (initialOptions.template && !choices.includes(initialOptions.template)) ||
    !initialOptions.template
      ? promptQuestions.templateName(choices)
      : null,
    (initialOptions.dir && !validateDirectoryName(initialOptions.dir)) ||
    !initialOptions.dir
      ? promptQuestions.buildDir
      : null,
  ].filter(Boolean);

  const answers = await prompt(questions);

  const {
    templateName = initialOptions.template,
    buildDir = initialOptions.dir,
  } = answers;

  return {
    buildDir,
    templateName,
    templatePath: path.join(templatesPath, templateName),
    dev: initialOptions.dev,
  };
};
