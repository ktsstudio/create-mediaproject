import { View, Root as VKRoot } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import VKPanel from 'components/special/VKPanel';
import Splash from 'pages/Splash';
import { VKRouteType, VKViewsType } from 'types/routes';
import {
  buidPanelId,
  buidViewId,
  useView,
  useVKRouter,
  onSwipeBack,
} from 'utils/useVKViews';

import '../../styles/styles.scss';

const Root: React.FC<VKViewsType> = ({ views, defaultRoute }: VKViewsType) => {
  const [appReady, setAppReady] = React.useState(false);
  const [activeView, activePanel] = useView();
  const pushPanel = useVKRouter();

  const handleAppReady = async () => {
    pushPanel(defaultRoute.panel, true);
    setAppReady(true);
  };

  if (!appReady) {
    return <Splash onReady={handleAppReady} />;
  }

  return (
    <VKRoot activeView={buidViewId(activeView)}>
      {Object.keys(views).map((viewKey) => {
        const viewRoutes: VKRouteType[] = views[viewKey];
        const defaultViewPanel = viewRoutes[0].panel;
        return (
          <View
            id={buidViewId(viewKey)}
            key={buidViewId(viewKey)}
            activePanel={buidPanelId(
              activeView === viewKey ? activePanel : defaultViewPanel
            )}
            onSwipeBack={onSwipeBack}
          >
            {viewRoutes.map((route) => {
              const panelId = buidPanelId(route.panel);
              const { Component } = route;
              return (
                <VKPanel key={panelId} id={panelId}>
                  <Component />
                </VKPanel>
              );
            })}
          </View>
        );
      })}
    </VKRoot>
  );
};

export default observer(Root);
