import { Button } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { PanelEnum } from 'config/routes';
import { useVKHistory } from 'utils/router';

const Main: React.FC = () => {
  const { push } = useVKHistory();

  return (
    <div>
      <Button onClick={() => push({ panel: PanelEnum.onboarding })}>
        Go to Onboarding
      </Button>
    </div>
  );
};

export default observer(Main);
