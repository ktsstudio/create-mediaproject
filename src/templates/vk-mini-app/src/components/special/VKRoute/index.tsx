import { Panel } from '@vkontakte/vkui';
import { observer } from 'mobx-react';
import * as React from 'react';
import Header from 'components/Header';
import Container from 'components/special/Container';
import { routes } from 'config/routes';
import { useView } from 'utils/hooks';

type Props = {
  id: string;
  Component: React.ComponentType;
};

const PAGES = [routes.onboarding.view];

const VKRoute: React.FC<Props> = ({ id, Component }: Props) => {
  const [view] = useView();
  const isFixedHeight = PAGES.indexOf(view) !== -1;

  return (
    <Panel id={id}>
      <Container fixedHeight={isFixedHeight}>
        <Header />
        <Component />
      </Container>
    </Panel>
  );
};

export default observer(VKRoute);
