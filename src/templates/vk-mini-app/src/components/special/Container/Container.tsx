import cn from 'classnames';
import * as React from 'react';

import styles from './Container.modules.scss';

interface Props {
  children: React.ReactNode;
  fixedHeight?: boolean;
}

const Container: React.FC<Props> = ({ children, fixedHeight }: Props) => {
  return (
    <div
      className={cn(styles.container, fixedHeight && 'container_fixed-height')}
    >
      {children}
    </div>
  );
};

Container.defaultProps = {
  fixedHeight: false,
};

export default React.memo(Container);
