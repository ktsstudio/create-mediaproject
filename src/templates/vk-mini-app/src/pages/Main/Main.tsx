import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PanelEnum } from 'config/routes';
import { buildVKLocation } from 'utils/router';

import './Main.modules.scss';

const Main: React.FC = () => {
  return (
    <div styleName="long-block">
      <div styleName="links">
        <Link to={buildVKLocation({ panel: PanelEnum.onboarding })}>
          Go to Onboarding
        </Link>
        <Link to={buildVKLocation({ panel: PanelEnum.mainSecond })}>
          Go to MainSecond
        </Link>
      </div>
    </div>
  );
};

export default observer(Main);
