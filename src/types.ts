import { FSWatcher } from 'chokidar';

export type InitialOptionsType = {
  dev: boolean;
  dir?: string;
  template?: string;
};

export type OptionsType = {
  buildDir: string;
  templateName: string;
  templatePath: string;
  dev?: boolean;
};

export type TemplateVariablesType = {
  projectName: string;
};

export type FSProps = {
  options: OptionsType;
  entryName: string;
  entryPath: string;
  projectBuildPath: string;
  isWatch?: boolean;
};

export type FSType = (props: FSProps) => void;

export type PrintType = (message: string) => void;

export type FSWatchProps = {
  options: OptionsType;
  fullPath: string;
};

export type FSWatchType = ({ options, fullPath }: FSWatchProps) => FSWatcher;
