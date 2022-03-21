import ENDPOINTS from 'config/endpoints';

import { RootStore } from './RootStore';

const rootStore = new RootStore(ENDPOINTS);

export default {
  rootStore,
};
