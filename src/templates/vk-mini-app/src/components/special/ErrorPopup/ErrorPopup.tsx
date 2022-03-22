import { Snackbar } from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import { Icon24ErrorCircle } from '@vkontakte/icons';
import { observer } from 'mobx-react';
import * as React from 'react';

import { useStore } from 'store/hooks';

import './ErrorPopup.scss';

const ErrorPopup: React.FC = () => {
  const { eraseError, errorText } = useStore();

  return (
    <Snackbar
      action="OK"
      onClose={eraseError}
      before={<Icon24ErrorCircle fill="#f00" />}
      duration={5000}
    >
      {errorText}
    </Snackbar>
  );
};

export default observer(ErrorPopup);
