import { WindowType } from '@ktsstudio/mediaproject-vk';

declare global {
  interface Window extends WindowType {
    is_dev: boolean;
  }
}
