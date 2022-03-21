import { BaseUserStore } from '@ktsstudio/mediaproject-stores';

import { RootStore } from './RootStore';

export class UserStore extends BaseUserStore {
  constructor(rootStore: RootStore) {
    super(rootStore);
  }
}
