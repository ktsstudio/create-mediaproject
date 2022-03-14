import { BaseRootStore } from '@ktsstudio/mediaproject-stores';

import { UserStore } from './UserStore';

export class RootStore extends BaseRootStore {
  userStore = new UserStore(this);
}
