import { OptionsType, TemplateVariablesType } from '../types';

export const buildTemplateVariables = (
  options: OptionsType
): TemplateVariablesType => ({
  projectName: options.buildDir,
});
