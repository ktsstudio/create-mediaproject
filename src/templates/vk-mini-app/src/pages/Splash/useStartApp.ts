import { loadImages } from '@ktsstudio/mediaproject-utils';
import * as React from 'react';

import config from 'config/routes';
import { allStatics } from 'img/config';
import { useUserStore } from 'store/hooks';
import { useVKHistory } from 'utils/router';

const useStartApp = (onReady: VoidFunction): number => {
  const [progress, setProgress] = React.useState(0);
  const imagesLength = allStatics.length;

  const { auth } = useUserStore();
  const { replace } = useVKHistory();

  React.useEffect(() => {
    Promise.all([
      loadImages(allStatics, () => setProgress((p: number) => p + 1)),
      auth(),
    ]).then(([, { response }]) => {
      // TODO: закоментить, чтоб приложение работало без авторизации
      // if (!response) {
      //   return;
      // }

      replace({ panel: config.defaultPanel, canSwipeBack: false });
      onReady();
    });
  }, []);

  return Math.floor((progress / imagesLength) * 100) || 0;
};

export default useStartApp;
