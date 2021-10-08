import { loadImages } from '@ktsstudio/mediaproject-utils';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'components/special/Container';
import { routes, buildUrl } from 'config/routes';
import { allStatics } from 'img/config';
import { useUserStore } from 'store/hooks';

interface Props {
  onReady: () => void;
}

const Splash: React.FC<Props> = ({ onReady }: Props) => {
  const [progress, setProgress] = useState(0);
  const history = useHistory();
  const userStore = useUserStore();

  const imagesLength = allStatics.length;

  const progressPercent = Math.floor((progress / imagesLength) * 100) || 0;

  useEffect(() => {
    loadImages([])
      // .then(userStore.auth)
      .then(() =>
        loadImages(allStatics, () => {
          setProgress((p: number) => p + 1);
        })
      )
      .then(() => setTimeout(() => true, 1000))
      .then(() => {
        history.replace({
          pathname: buildUrl(routes.onboarding.view, routes.onboarding.index),
          state: 'start',
        });
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
