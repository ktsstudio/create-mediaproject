import ENDPOINTS from 'config/endpoints';
import { errors, ErrorsEnum } from 'config/errors';

import { RootStore } from './RootStore';

const rootStore = new RootStore(ENDPOINTS, ErrorsEnum, errors);

export default {
  rootStore,
};
