import { BaseRootStore, BaseUserStore } from '@ktsstudio/mediaproject-stores';

export class UserStore extends BaseUserStore<BaseRootStore> {
  constructor(rootStore: BaseRootStore) {
    super(rootStore);
    // todo: makeObservable
  }
}
