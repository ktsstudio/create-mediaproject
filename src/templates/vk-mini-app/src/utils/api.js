import * as Sentry from '@sentry/browser';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';

import get from 'utils/getter';
import localStorage from 'utils/localStorage';

export function callApi(url, methodType = 'GET', config = {}) {
  const method = methodType.toLowerCase();

  return axios({
    method,
    url,
    ...config,
  }).then(
    (result) => {
      if (result.status !== 200 && get(result, 'data.status') !== 'ok') {
        return Promise.reject(result);
      }

      if (get(result, 'data.status') === 'error') {
        return Promise.reject(result);
      }

      const response =
        get(result, 'data.data') || get(result, 'data') || result;

      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default function api(
  endpoint,
  methodType = 'GET',
  data = {},
  config = {},
  multipartFormData = false,
  withToken = true
) {
  const queryConfig = { ...config };

  if (
    (queryConfig.data === null || queryConfig.data === undefined) &&
    methodType !== 'GET'
  ) {
    queryConfig.data = data;
  }

  if (!queryConfig.headers) {
    queryConfig.headers = {};
  }

  if (multipartFormData) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    queryConfig.data = formData;

    Object.assign(queryConfig.headers, {
      'Content-Type': 'multipart/form-data',
    });
  }

  if (localStorage.getItem('token') && withToken) {
    Object.assign(queryConfig.headers, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  const queryMethodType = methodType.toUpperCase();

  if (queryMethodType === 'GET') {
    queryConfig.params = {
      ...data,
      uid: localStorage.getItem('userId'),
    };
  } else {
    queryConfig.params = {
      uid: localStorage.getItem('userId'),
    };
  }

  return callApi(endpoint, queryMethodType, queryConfig)
    .then((response) => ({ response }))
    .catch((error) => {
      if (window.IS_PRODUCTION) {
        Sentry.captureException(error);
      }
      return {
        error,
        errorData: get(error, 'response.data') || {},
      };
    });
}

export const vkApi = async (method, params = {}) => {
  try {
    return await bridge.send('VKWebAppCallAPIMethod', {
      method,
      params: { ...params, v: '5.103', access_token: window.access_token },
    });
  } catch (e) {
    if (window.IS_PRODUCTION) {
      Sentry.captureException(e);
    }
    return { error: e };
  }
};

export const OK = 'ok';
