import cn from 'classnames';
import * as React from 'react';

import styles from './Container.modules.scss';

interface Props {
  children: React.ReactNode;
  fixedHeight?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  fixedHeight = false,
}: Props) => {
  return (
    <div
      className={cn(
        styles.container,
        fixedHeight && styles['container_fixed-height']
      )}
    >
      {children}
    </div>
  );
};

export default React.memo(Container);
