import { Panel } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Header from 'components/Header';
import Container from 'components/special/Container';
import ErrorPopup from 'components/special/ErrorPopup';
import withError from 'components/special/withError';
import { useStore } from 'store/hooks';

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
  const { eraseError, errorShown } = useStore();

  const [popup, setPopup] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (errorShown) {
      setPopup(<ErrorPopup />);
    }
  }, [errorShown]);

  useEffect(() => {
    return () => {
      eraseError();
      setPopup(null);
    };
  }, [id]);

  return (
    <Panel id={id}>
      <Container fixedHeight={fixedHeight}>
        <Header />
        {children}
        {popup}
      </Container>
    </Panel>
  );
};

export default withError(observer(VKPanel));
