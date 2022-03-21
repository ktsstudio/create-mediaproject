import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

import { RootStore } from './RootStore';
import { UserStore } from './UserStore';

export function useStore(): RootStore {
  return useContext(MobXProviderContext).rootStore as RootStore;
}

export function useUserStore(): UserStore {
  return useStore().userStore;
}
