import { Panel } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import Header from 'components/Header';
import Container from 'components/special/Container';

type VKPanelProps = {
  id: string;
  children: React.ReactElement;
};

const VKPanel: React.FC<VKPanelProps> = ({ children, id }: VKPanelProps) => {
  return (
    <Panel id={id}>
      <Container fixedHeight>
        <Header />
        {children}
      </Container>
    </Panel>
  );
};

export default observer(VKPanel);
