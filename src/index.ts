#!/usr/bin/env node

import chalk from 'chalk';

import { parseOptions } from './parseOptions';
import { createProject } from './createProject';
import { postProcess } from './postProcess';

(async () => {
  const options = await parseOptions();
  try {
    createProject(options);
    postProcess(options);
    console.log(
      chalk.green(`Project ${options.projectName} was created successfully!`)
    );
  } catch (e) {
    console.log(chalk.red('Error while creating project'));
  }
})();
