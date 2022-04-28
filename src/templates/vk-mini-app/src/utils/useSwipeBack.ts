import bridge from '@vkontakte/vk-bridge';
import * as React from 'react';
import { useHistory } from 'react-router';

import { useVKLocation } from './router';

export default (): string[] => {
  const history = useHistory();
  const { modal } = useVKLocation();

  const lastView = React.useRef<string>('');
  const [historyArray, setHistoryArray] = React.useState<string[]>([]);
  const isFirst = historyArray.length <= 1;

  React.useEffect(() => {
    bridge.send(
      isFirst ? 'VKWebAppEnableSwipeBack' : 'VKWebAppDisableSwipeBack'
    );
  }, [isFirst]);

  React.useEffect(() => {
    history.listen((location, action) => {
      const [, view, panel] = location.pathname.split('/');

      setHistoryArray((history) => {
        // переход на новую вьюшку
        if (view !== lastView.current) {
          lastView.current = view;
          return [panel];
        }

        if (panel === history[history.length - 1]) {
          return history;
        }

        switch (action) {
          case 'POP':
            history.pop();
            // создаем новый массив, чтобы сработало изменение historyArray и isFirst
            return [...history];
          case 'REPLACE':
            history.pop();
            return [...history, panel];
          case 'PUSH':
            return [...history, panel];
          default:
            return history;
        }
      });
    });
  }, []);

  return modal ? [] : historyArray;
};
