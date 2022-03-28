import * as React from 'react';

import './ErrorMessage.modules.scss';

const ErrorMessage: React.FC = () => {
  return (
    <div styleName="error">
      Произошла ошибка! Перезагрузите приложение или попробуйте позже
    </div>
  );
};

export default React.memo(ErrorMessage);
