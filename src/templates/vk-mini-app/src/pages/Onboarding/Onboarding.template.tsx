import { Button } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ModalEnum, PanelEnum } from 'config/routes';
import { useVKHistory, useVKLocation } from 'utils/router';

import styles from './Onboarding.modules.scss';
import ReactIcon from './react-icon.component.svg';

const Onboarding: React.FC = () => {
  const { push, goBack } = useVKHistory();
  const { modal } = useVKLocation();

  return (
    <>
        <div className={styles.container}>
          <h1><%= projectName %></h1>
          <div>
            <div className={styles.vk_icon} />
            <div className={styles.react_icon}>
              <ReactIcon />
            </div>
            <div className={styles.webpack_icon} />
          </div>
          <div className={styles.buttons}>
            <Button onClick={() => push({ panel: PanelEnum.main })}>Go to Main page</Button>
            <Button onClick={() => push({ modal: ModalEnum.greeting })}>Open Greeting modal</Button>
          </div>
        </div>
        {modal === ModalEnum.greeting &&
        <div className={styles.modal}>
            <div className={styles.modal_title}>hi there</div>
            <Button onClick={goBack}>Close modal</Button>
        </div>}
    </>
  );
};

export default observer(Onboarding);
