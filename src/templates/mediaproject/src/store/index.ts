import endpoints from 'config/endpoints';

import { RootStore } from './RootStore';

const rootStore = new RootStore(endpoints);

export default { rootStore };
