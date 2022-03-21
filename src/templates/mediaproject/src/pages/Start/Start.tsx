import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import withError from 'components/withError';

import './Start.modules.scss';

const Start: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div styleName="start">
      <h1 styleName="start__title">Start page</h1>
      <a styleName="start__link" onClick={() => navigate(-1)}>
        Go back
      </a>
    </div>
  );
};

export default withError(React.memo(Start));
