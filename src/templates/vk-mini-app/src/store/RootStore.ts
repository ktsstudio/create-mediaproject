import { UserStore } from './UserStore';

export class RootStore {
  userStore = new UserStore(this);
}
