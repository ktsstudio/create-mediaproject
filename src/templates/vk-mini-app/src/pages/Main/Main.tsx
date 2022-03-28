import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PanelEnum } from 'config/routes';
import { buildVKLocation } from 'utils/router';
import { useStore } from 'store/hooks';

const Main: React.FC = () => {
  const store = useStore();

  React.useEffect(() => {
    store.handleError({
      response: null,
      error: new Error('Hello example error!'),
      errorData: null,
      url: 'example',
      showError: true,
    });
  }, []);

  return (
    <div>
      <Link to={buildVKLocation({ panel: PanelEnum.onboarding })}>
        Go to Onboarding
      </Link>
    </div>
  );
};

export default observer(Main);
