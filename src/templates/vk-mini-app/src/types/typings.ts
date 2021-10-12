declare module '*.modules.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';

interface Window {
  IS_DEV: boolean;
  IS_PRODUCTION: boolean;
  IS_MOBILE: boolean;
  PLATFORM: string;
  LOCATION_HASH: string;
  is_odr: boolean;
  is_ios: boolean;
  app_id: number;
  scope: string | null;
  user_id: number | null;
  access_token: string;
  group_id: number | null;
  search: string;
  page: string | null;
}

declare module 'eruda';

declare module 'eruda-dom';

declare module 'eruda-code';
