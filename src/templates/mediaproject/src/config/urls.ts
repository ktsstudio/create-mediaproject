import { UrlConfigType } from 'types/urls';

const getApiUrl = () => process.env.API_URL || '/' + '';

export const urls: Record<string, UrlConfigType> = {
  getInfo: { url: `${getApiUrl()}user/get`, method: 'GET' },
};
