import { EndpointsType } from '@ktsstudio/mediaproject-stores';

const API_URL = () => process.env.API_URL || '/' + '';

const ENDPOINTS: EndpointsType = {
  auth: { url: `${API_URL()}user/auth` },
  getUser: { url: `${API_URL()}user/get` },
  flag: { url: `${API_URL()}user/flag`, method: 'POST' },
};

export default ENDPOINTS;
