import { observer } from 'mobx-react';
import * as React from 'react';

import { PanelEnum } from 'config/routes';
import { useVKRouter } from 'utils/useVKViews';

import styles from './Onboarding.modules.scss';
import ReactIcon from './react-icon.component.svg';

const Onboarding: React.FC = () => {
  const pushPanel = useVKRouter();

  return (
    <div className={styles.container}>
      <h1><%= projectName %></h1>
      <div>
        <div className={styles.vk_icon} />
        <div className={styles.react_icon}>
          <ReactIcon />
        </div>
        <div className={styles.webpack_icon} />
      </div>
      <div onClick={() => pushPanel(PanelEnum.main)}>Go to Main</div>
    </div>
  );
};

export default observer(Onboarding);
