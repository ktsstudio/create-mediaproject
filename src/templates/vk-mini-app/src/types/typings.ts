declare module '*.modules.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';

interface Window {
  app_id: number;
  scope: string | null;
  user_id: number | null;
  IS_PRODUCTION: boolean;
  access_token: string;
  group_id: number | null;
  search: string;
  PLATFORM: string;
  IS_MOBILE: boolean;
  LOCATION_HASH: string;
  page: string | null;
  IS_DEV: boolean;
}

declare module 'eruda';

declare module 'react-slick';
