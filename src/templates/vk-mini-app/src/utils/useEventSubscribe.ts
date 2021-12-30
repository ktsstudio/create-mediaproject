import bridge, {
  VKBridgeEvent,
  AnyReceiveMethodName,
} from '@vkontakte/vk-bridge';
import * as React from 'react';

/**
 * Подписывается на событие vk-bridge.
 * @param {AnyReceiveMethodName} eventName Название события
 * @param {VoidFunction} callBack Колбэк, вызываемый при наступлении события
 * @param {React.DependencyList} deps Зависимости переданного колбэка. По умолчанию пустые
 */
export default (
  eventName: AnyReceiveMethodName,
  callBack: VoidFunction,
  deps: React.DependencyList = []
): void => {
  const eventListener = React.useCallback(
    (event: VKBridgeEvent<AnyReceiveMethodName>) => {
      if (event.detail.type === eventName) {
        callBack();
      }
    },
    deps
  );

  React.useEffect(() => {
    bridge.subscribe(eventListener);

    return () => bridge.unsubscribe(eventListener);
  }, deps);
};
