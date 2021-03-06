import * as fs from 'fs';
import * as path from 'path';

import { prompt } from 'inquirer';
import * as yargs from 'yargs';

export type OptionsType = {
  projectName: string;
  templateName: string;
  targetPath: string;
  fullProjectPath: string;
  templatePath: string;
};

export const parseOptions = async (): Promise<OptionsType> => {
  const { argv } = yargs
    .option('dir', {
      alias: 'd',
      description: 'Dir for creation',
      type: 'string',
    })
    .help()
    .alias('help', 'h');

  const templatesPath = path.join(__dirname, 'templates');
  const choices = fs.readdirSync(templatesPath);

  const questions = [
    {
      name: 'templateName',
      type: 'list',
      message: 'Select project type',
      choices: choices,
    },
    {
      name: 'projectName',
      type: 'input',
      message: 'Project name (also directory)',
      validate: (input: string) => {
        if (/^([A-Za-z\-_\d])+$/.test(input)) {
          return true;
        }
        return 'Incorrect name';
      },
    },
  ];

  const answers = await prompt(questions);

  const { templateName, projectName = argv.dir } = answers;

  return {
    projectName,
    templateName,
    targetPath: projectName,
    fullProjectPath: projectName,
    templatePath: path.join(templatesPath, templateName),
  };
};
