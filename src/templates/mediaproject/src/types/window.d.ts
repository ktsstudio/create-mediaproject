import { WindowType } from '@ktsstudio/mediaproject-utils';

declare global {
  interface Window extends WindowType {
    is_dev: boolean;
  }
}
