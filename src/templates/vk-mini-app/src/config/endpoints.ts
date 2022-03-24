import { EndpointsType } from '@ktsstudio/mediaproject-stores';

const getApiUrl = () => process.env.API_URL || '/' + '';

const ENDPOINTS: EndpointsType = {
  auth: { url: `${getApiUrl()}user/auth` },
  getUser: { url: `${getApiUrl()}user/get` },
  flag: { url: `${getApiUrl()}user/flag`, method: 'POST' },
};

export default ENDPOINTS;
