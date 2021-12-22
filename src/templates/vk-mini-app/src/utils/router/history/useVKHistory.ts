import * as React from 'react';
import { useHistory } from 'react-router';

import { useVKLocation } from '../location/useVKLocation';
import { buildVKLocation } from '../utils/builders';

import { PushOrReplaceVKLocationParams, VKHistoryType } from './types';

// пуш/реплейс/переход назад
export function useVKHistory<
  LocationStateType = void
>(): VKHistoryType<LocationStateType> {
  const { panel: activePanel } = useVKLocation();
  const { push, replace, goBack } = useHistory();

  return React.useMemo(() => {
    return {
      push: ({
        panel = undefined,
        modal = undefined,
        canSwipeBack = true,
        state = undefined,
      }: PushOrReplaceVKLocationParams<LocationStateType>) => {
        push(
          buildVKLocation({
            panel: panel || activePanel,
            modal,
            canSwipeBack,
            state,
          })
        );
      },
      replace: ({
        panel = undefined,
        modal = undefined,
        canSwipeBack = true,
        state = undefined,
      }: PushOrReplaceVKLocationParams<LocationStateType>) => {
        replace(
          buildVKLocation({
            panel: panel || activePanel,
            modal,
            canSwipeBack,
            state,
          })
        );
      },
      goBack,
    };
  }, []);
}
