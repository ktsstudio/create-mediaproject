import { View, Root as VKRoot } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import VKPanel from 'components/special/VKPanel';
import config from 'config/routes';
import Splash from 'pages/Splash';
import { useVKLocation } from 'utils/router';
import { VKViewsType } from 'utils/router/utils/views/types';

import '../../styles/styles.scss';

type RootProps = {
  views: VKViewsType;
};

const Root: React.FC<RootProps> = ({ views }: RootProps) => {
  const [appReady, setAppReady] = React.useState(false);
  const { view: activeView, panel: activePanel } = useVKLocation();

  const handleAppReady = React.useCallback(async () => {
    setAppReady(true);
  }, []);

  if (!appReady) {
    return <Splash onReady={handleAppReady} />;
  }

  return (
    <VKRoot activeView={activeView}>
      {Object.entries(views).map(([view, viewPanels]) => (
        <View
          key={view}
          id={view}
          activePanel={activeView === view ? activePanel : viewPanels[0]}
        >
          {viewPanels.map((panel) => {
            const { Component, fixedHeight } = config.routes[panel];

            return (
              <VKPanel key={panel} id={panel} fixedHeight={fixedHeight}>
                <Component />
              </VKPanel>
            );
          })}
        </View>
      ))}
    </VKRoot>
  );
};

export default observer(Root);
