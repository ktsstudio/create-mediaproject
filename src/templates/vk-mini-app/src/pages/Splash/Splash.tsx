import { observer } from 'mobx-react';
import * as React from 'react';

import Container from 'components/special/Container';

import useStartApp from './useStartApp';

type Props = {
  onReady: VoidFunction;
};

const Splash: React.FC<Props> = ({ onReady }: Props) => {
  const progressPercent = useStartApp(onReady);

  return (
    <Container fixedHeight>
      <div>{progressPercent}%</div>
    </Container>
  );
};

export default observer(Splash);
