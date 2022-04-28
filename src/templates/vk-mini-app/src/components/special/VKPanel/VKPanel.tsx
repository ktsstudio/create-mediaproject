import { Panel } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';

import Header from 'components/Header';
import Container from 'components/special/Container';
import withError from 'components/special/withError';

type VKPanelProps = {
  id: string;
  children: React.ReactElement;
  fixedHeight?: boolean;
};

const VKPanel: React.FC<VKPanelProps> = ({
  children,
  id,
  fixedHeight = false,
}: VKPanelProps) => {
  return (
    <Container fixedHeight={fixedHeight}>
      <Panel id={id}>
        <Header />
        {children}
      </Panel>
    </Container>
  );
};

export default withError(observer(VKPanel));
