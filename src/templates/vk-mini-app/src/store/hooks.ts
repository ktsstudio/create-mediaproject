import { MobXProviderContext } from 'mobx-react';
import * as React from 'react';

import { RootStore } from './RootStore';
import { UserStore } from './UserStore';

export function useStore(): RootStore {
  return React.useContext(MobXProviderContext).rootStore as RootStore;
}

export function useUserStore(): UserStore {
  return useStore().userStore;
}
