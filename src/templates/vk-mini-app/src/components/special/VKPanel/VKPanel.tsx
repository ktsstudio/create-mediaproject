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
    <Panel id={id}>
      <Container fixedHeight={fixedHeight}>
        <Header />
        {children}
      </Container>
    </Panel>
  );
};

export default withError(observer(VKPanel));
