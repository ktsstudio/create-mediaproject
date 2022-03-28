import { Panel } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';

import Header from 'components/Header';
import Container from 'components/special/Container';
import ErrorPopup from 'components/special/ErrorPopup';
import withError from 'components/special/withError';
import { useStore } from 'store/hooks';
import { useVKLocation } from 'utils/router';

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
  const { eraseError, setErrorPopup, errorPopup } = useStore();
  const store = useStore();
  const { panel } = useVKLocation();

  useEffect(() => {
    if (store.errorShown) {
      setErrorPopup(<ErrorPopup />);
    }
  }, [store.errorShown]);

  useEffect(() => {
    return () => {
      if (errorPopup) {
        eraseError();
      }
    };
  }, [panel]);

  return (
    <Panel id={id}>
      <Container fixedHeight={fixedHeight}>
        <Header />
        {children}
        {store.errorPopup}
      </Container>
    </Panel>
  );
};

export default withError(observer(VKPanel));
