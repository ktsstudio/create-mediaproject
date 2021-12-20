import { VKLocationParams } from '../location/types';

export type PushOrReplaceVKLocationParams<LocationStateType = void> = Partial<
  VKLocationParams<LocationStateType>
>;

export type PushOrReplacePanelType<LocationStateType = void> = (
  params: PushOrReplaceVKLocationParams<LocationStateType>
) => void;

export type VKHistoryType<LocationStateType = void> = {
  push: PushOrReplacePanelType<LocationStateType>;
  replace: PushOrReplacePanelType<LocationStateType>;
  goBack: VoidFunction;
};
