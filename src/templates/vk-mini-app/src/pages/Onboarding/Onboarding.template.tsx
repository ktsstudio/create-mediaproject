import * as React from 'react';

import styles from './Onboarding.modules.scss';
import ReactIcon from './react-icon.component.svg';

const Onboarding = () => {
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
    </div>
  );
};

export default React.memo(Onboarding);
