import { loadImages } from '@ktsstudio/mediaproject-utils';
import { observer } from 'mobx-react';
import * as React from 'react';

import Container from 'components/special/Container';
import { allStatics } from 'img/config';

interface Props {
  onReady(): void;
}

const Splash: React.FC<Props> = ({ onReady }: Props) => {
  const [progress, setProgress] = React.useState(0);
  const imagesLength = allStatics.length;
  const progressPercent = Math.floor((progress / imagesLength) * 100) || 0;

  React.useEffect(() => {
    loadImages(allStatics)
      .then(() =>
        loadImages(allStatics, () => setProgress((p: number) => p + 1))
      )
      .then(onReady);
  }, []);

  return (
    <Container fixedHeight>
      <div>{progressPercent}%</div>
    </Container>
  );
};

export default observer(Splash);
