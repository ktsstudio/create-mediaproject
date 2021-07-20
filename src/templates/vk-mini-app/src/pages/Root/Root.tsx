import bridge from '@vkontakte/vk-bridge';
import { Root as VKRoot, View } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import VKRoute from 'components/special/VKRoute';
import { routes } from 'config/routes';
import { useView } from 'utils/hooks';

import '../../styles/styles.scss';
import Onboarding from '../Onboarding';

const usePanel = (p: string) => {
  return p || routes.onboarding.index;
};

const Root: React.FC = () => {
  const [view, p] = useView();
  const history = useHistory();

  const panel = usePanel(p);

  const goBack = () => {
    const isStart = history.location.state === 'start';
    if (isStart) {
      if (bridge.supports('VKWebAppDisableSwipeBack')) {
        bridge.send('VKWebAppDisableSwipeBack');
      }
    } else {
      if (bridge.supports('VKWebAppEnableSwipeBack')) {
        bridge.send('VKWebAppEnableSwipeBack');
        history.goBack();
      }
    }
  };

  return (
    <>
      <VKRoot activeView={view || routes.onboarding.view}>
        <View
          id={routes.onboarding.view}
          activePanel={
            view === routes.onboarding.view ? panel : routes.onboarding.index
          }
          onSwipeBack={goBack}
        >
          <VKRoute id={routes.onboarding.index} Component={Onboarding} />
        </View>
      </VKRoot>
    </>
  );
};

export default observer(Root);
