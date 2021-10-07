import * as React from 'react';

import styles from './Onboarding.modules.scss';

const Onboarding = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo} />
    </div>
  );
};

export default React.memo(Onboarding);
