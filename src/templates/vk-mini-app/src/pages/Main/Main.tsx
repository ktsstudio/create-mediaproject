import { observer } from 'mobx-react';
import * as React from 'react';

import { PanelEnum } from 'config/routes';
import { useVKRouter } from 'utils/useVKViews';

const Main: React.FC = () => {
  const pushPanel = useVKRouter();

  return (
    <div>
      <h1>Main</h1>
      <div onClick={() => pushPanel(PanelEnum.onboarding)}>
        Go to Onboarding
      </div>
    </div>
  );
};

export default observer(Main);
