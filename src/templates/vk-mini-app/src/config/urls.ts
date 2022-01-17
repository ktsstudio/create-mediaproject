import { UrlConfigType } from '@ktsstudio/mediaproject-utils';

const getApiUrl = () => process.env.API_URL || '/' + '';

export const urls: Record<string, UrlConfigType> = {
  authUser: { url: `${getApiUrl()}user/auth`, method: 'GET' }, // авторизация
  getInfo: { url: `${getApiUrl()}user/get`, method: 'GET' }, // вся инфомация по пользователю как в авторизации
  flags: { url: `${getApiUrl()}user/flag`, method: 'POST' }, // флаги
};
