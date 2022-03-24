import { Button } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ModalEnum, PanelEnum } from 'config/routes';
import { useVKHistory, useVKLocation } from 'utils/router';

import './Onboarding.modules.scss';
import ReactIcon from './react-icon.component.svg';

const Onboarding: React.FC = () => {
  const { push, goBack } = useVKHistory();
  const { modal } = useVKLocation();

  return (
    <>
      <div styleName="container">
        <h1><%= projectName %></h1>
        <div>
          <div styleName="vk_icon" />
          <div styleName="react_icon">
            <ReactIcon />
          </div>
          <div styleName="webpack_icon" />
        </div>
        <div styleName="buttons">
          <Button onClick={() => push({ panel: PanelEnum.main })}>
            Go to Main page
          </Button>
          <Button onClick={() => push({ modal: ModalEnum.greeting })}>
            Open Greeting modal
          </Button>
        </div>
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

export default observer(Onboarding);
