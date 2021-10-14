import { observer } from 'mobx-react';
import * as React from 'react';

const FirstViewSecondPanel: React.FC = () => {
  return (
    <div>
      <h1>1-2</h1>
    </div>
  );
};

export default observer(FirstViewSecondPanel);
