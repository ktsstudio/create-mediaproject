import bridge from '@vkontakte/vk-bridge';
import { makeAutoObservable } from 'mobx';
import urls from 'config/urls';
import api from 'utils/api';

import { RootStore } from './RootStore';
import { normalizeAuth } from './types';

export class UserStore {
  rootStore: RootStore;

  userId: string | null = null; // id пользователя

  finishedOnboarding = false; // видел ли пользователь стартовую
  // страницу

  isAllowGroupMessages = false; // с бэка разрешение на отправку
  // сообщений

  isAuthorizing = false; // авторизация в процессе

  isAuthorized = false; // авторизован

  isPermissionLoading = false; // получение прав в процессе

  isError = false; // ошибка

  isLoading = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  // авторизация
  auth = async (): Promise<boolean> => {
    this.isAuthorizing = true;

    try {
      const vkResponse = await bridge.send('VKWebAppGetUserInfo', {});
      console.log(vkResponse);

      // const { response }: any = await api(
      //   `${urls.authUser}${window.search}`,
      //   'GET',
      //   {
      //     bdate: vkResponse.bdate,
      //     first_name: vkResponse.first_name,
      //     last_name: vkResponse.last_name,
      //     sex: vkResponse.sex,
      //     city_id: vkResponse.city?.id,
      //     country_id: vkResponse.country?.id,
      //   }
      // );
      //
      // if (response) {
      //   const { isAllowGroupMessages } = normalizeAuth(response);
      //
      //   this.isAllowGroupMessages = isAllowGroupMessages;
      //
      //   this.isAuthorized = true;
      // }

      this.isAuthorized = true;
    } catch (e) {
      this.isError = true;
      console.log('auth failed', e);
    }
    this.isAuthorizing = false;

    return this.isAuthorized;
  };

  // установить флаг
  changeFlags = async (flag: string): Promise<boolean> => {
    const { response }: any = await api(urls.flags, 'POST', {
      name: flag,
      value: true,
    });
    return Boolean(response);
  };

  // права на отправку сообщений от имени сообщества
  onPermissionMessage = async (): Promise<boolean> => {
    if (this.isPermissionLoading) {
      return false;
    }

    this.isPermissionLoading = true;

    // если с бэка пришло, что можно отправлять сообщения, то ничего не делаем
    if (this.isAllowGroupMessages) {
      this.isPermissionLoading = false;
      return true;
    }

    try {
      const { result } = await bridge.send('VKWebAppAllowMessagesFromGroup', {
        group_id: window.group_id || -1,
      });

      if (result) {
        this.isAllowGroupMessages = true;
        this.isPermissionLoading = false;
        return true;
      }

      this.isAllowGroupMessages = false;
      this.isPermissionLoading = false;
      return false;
    } catch (e) {
      console.log('error VKWebAppAllowMessagesFromGroup', e);

      this.isAllowGroupMessages = false;
      this.isPermissionLoading = false;

      return false;
    }
  };
}
