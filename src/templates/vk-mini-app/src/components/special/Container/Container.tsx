import cn from 'classnames';
import * as React from 'react';

import './Container.modules.scss';

interface Props {
  children: React.ReactNode;
  fixedHeight?: boolean;
}

const Container: React.FC<Props> = ({ children, fixedHeight }: Props) => {
  return (
    <div styleName={cn('container', fixedHeight && 'container_fixed-height')}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  fixedHeight: false,
};

export default React.memo(Container);
