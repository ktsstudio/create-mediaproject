import { observer } from 'mobx-react';
import * as React from 'react';

const FirstViewFirstPanel: React.FC = () => {
  return (
    <div>
      <h1>1-1</h1>
    </div>
  );
};

export default observer(FirstViewFirstPanel);
