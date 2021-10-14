import chalk from 'chalk';

import { PrintType } from '../types';

/* eslint-disable no-console */
export const printError: PrintType = (message) =>
  console.log(chalk.red(message));

export const printSuccess: PrintType = (message) =>
  console.log(chalk.green(message));

export const printWarning: PrintType = (message) =>
  console.log(chalk.yellow(message));
