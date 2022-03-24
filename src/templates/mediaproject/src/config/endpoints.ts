import { EndpointsType } from '@ktsstudio/mediaproject-stores';

const getApiUrl = () => process.env.API_URL || '/' + '';

const ENDPOINTS: EndpointsType = {
  auth: { url: `${getApiUrl()}user/auth` },
};

export default ENDPOINTS;
