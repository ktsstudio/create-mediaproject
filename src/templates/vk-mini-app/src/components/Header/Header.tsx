import { Header as VKHeader } from '@vkontakte/vkui';
import * as React from 'react';

import './Header.modules.scss';

const Header: React.FC = () => (
  <div styleName="header-wrapper">
    <VKHeader>vk mini app</VKHeader>
  </div>
);

export default React.memo(Header);
