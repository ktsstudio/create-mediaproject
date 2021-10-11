import * as React from 'react';

import { PanelEnum } from 'config/routes';
import { useVKRouter } from 'utils/useVKViews';

const Header: React.FC = () => {
  const pushPanel = useVKRouter();
  return (
    <div>
      <div onClick={() => pushPanel(PanelEnum.firstFirst)}>1-1</div>
      <div onClick={() => pushPanel(PanelEnum.firstSecond)}>1-2</div>
      <div onClick={() => pushPanel(PanelEnum.secondFirst)}>2-1</div>
      <div onClick={() => pushPanel(PanelEnum.secondSecond)}>2-2</div>
    </div>
  );
};

export default React.memo(Header);
