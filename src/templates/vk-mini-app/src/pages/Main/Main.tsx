import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PanelEnum } from 'config/routes';
import { buildVKLocation } from 'utils/router';

const Main: React.FC = () => {
  return (
    <div>
      <Link to={buildVKLocation({ panel: PanelEnum.onboarding })}>
        Go to Onboarding
      </Link>
    </div>
  );
};

export default observer(Main);
