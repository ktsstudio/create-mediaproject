import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

import { RootStore } from './RootStore';

export function useStore(): RootStore {
  return useContext(MobXProviderContext).rootStore as RootStore;
}
