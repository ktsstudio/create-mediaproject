import cn from 'classnames';
import * as React from 'react';

import './Container.modules.scss';

interface Props {
  children: React.ReactNode;
  fixedHeight?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  fixedHeight = false,
}: Props) => (
  <div styleName={cn('container', fixedHeight && 'container_fixed-height')}>
    {children}
  </div>
);

export default React.memo(Container);
