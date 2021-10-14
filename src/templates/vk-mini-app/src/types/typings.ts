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
  app_id: number;
  scope: string | null;
  user_id: number | null;
  access_token: string;
  group_id: number | null;
  search: string;
  page: string | null;
}
