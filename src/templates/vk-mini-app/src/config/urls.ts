const getApiUrl = () => process.env.API_URL || '/' + '';

export default {
  authUser: `${getApiUrl()}user/auth`, // авторизация GET
  getInfo: `${getApiUrl()}user/get`, // вся инфомация по пользователю как в авторизации GET
  flags: `${getApiUrl()}user/flag`, // флаги POST
};
