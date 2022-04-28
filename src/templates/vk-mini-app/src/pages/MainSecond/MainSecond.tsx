import { Button } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ModalEnum } from 'config/routes';
import { useVKHistory, useVKLocation } from 'utils/router';

import './MainSecond.modules.scss';

const MainSecond: React.FC = () => {
  const { push, goBack } = useVKHistory();
  const { modal } = useVKLocation();

  return (
    <>
      <div styleName="buttons">
        <Button onClick={goBack}>Go back</Button>
        <Button onClick={() => push({ modal: ModalEnum.greeting })}>
          Open Greeting modal
        </Button>
      </div>
      {modal === ModalEnum.greeting && (
        <div styleName="modal">
          <div styleName="modal_title">hi there</div>
          <Button onClick={goBack}>Close modal</Button>
        </div>
      )}
    </>
  );
};

export default observer(MainSecond);
