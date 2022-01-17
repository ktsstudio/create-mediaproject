import { useEventSubscribe } from '@ktsstudio/mediaproject-vk';
import { View, Root as VKRoot } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import VKPanel from 'components/special/VKPanel';
import { routes } from 'config/routes';
import Splash from 'pages/Splash';
import { useVKLocation, useVKViews } from 'utils/router';
import setViewSettings from 'utils/setViewSettings';

import '../../styles/styles.scss';

const Root: React.FC = () => {
  const views = useVKViews();
  const [appReady, setAppReady] = React.useState(false);
  const { view: activeView, panel: activePanel } = useVKLocation();

  useEventSubscribe('VKWebAppViewRestore', setViewSettings);

  const handleAppReady = React.useCallback(() => {
    setAppReady(true);
  }, []);

  if (!appReady) {
    return <Splash onReady={handleAppReady} />;
  }

  return (
    <VKRoot activeView={activeView}>
      {views.map(([view, viewPanels]) => (
        <View
          key={view}
          id={view}
          activePanel={activeView === view ? activePanel : viewPanels[0]}
        >
          {viewPanels.map((panel) => {
            const { Component, fixedHeight } = routes[panel];

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
