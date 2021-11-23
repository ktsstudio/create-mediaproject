import { loadImages } from '@ktsstudio/mediaproject-utils';
import Container from 'components/special/Container';
import config from 'config/routes';
import { allStatics } from 'img/config';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useVKHistory } from 'utils/router';

interface Props {
  onReady(): void;
}

const Splash: React.FC<Props> = ({ onReady }: Props) => {
  const { replace } = useVKHistory();

  const [progress, setProgress] = React.useState(0);
  const imagesLength = allStatics.length;
  const progressPercent = Math.floor((progress / imagesLength) * 100) || 0;

  React.useEffect(() => {
    loadImages(allStatics, () => setProgress((p: number) => p + 1)).then(() => {
      replace({ panel: config.defaultPanel, canSwipeBack: false });
      onReady();
    });
  }, []);

  return (
    <Container fixedHeight>
      <div>{progressPercent}%</div>
    </Container>
  );
};

export default observer(Splash);
