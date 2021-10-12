import { observer } from 'mobx-react';
import * as React from 'react';

const SecondViewFirstPanel: React.FC = () => {
  return (
    <div>
      <h1>2-1</h1>
    </div>
  );
};

export default observer(SecondViewFirstPanel);
