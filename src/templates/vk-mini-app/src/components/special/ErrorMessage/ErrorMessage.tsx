import * as React from 'react';

import styles from './ErrorMessage.modules.scss';

const ErrorMessage: React.FC = () => {
  return (
    <div className={styles.error}>
      Произошла ошибка! Перезагрузите приложение или попробуйте позже
    </div>
  );
};

export default React.memo(ErrorMessage);
