import { Button } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { PanelEnum } from 'config/routes';
import { useVKHistory } from 'utils/router';

import './Onboarding.modules.scss';
import ReactIcon from './react-icon.component.svg';

const Onboarding: React.FC = () => {
  const { push } = useVKHistory();

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
        </div>
      </div>
    </>
  );
};

export default observer(Onboarding);
