import * as React from 'react';
import { Link } from 'react-router-dom';

import withError from 'components/withError';
import { RouteEnum } from 'config/routes';

import './Home.modules.scss';

const Home: React.FC = () => {
  return (
    <div styleName="home">
      <h1 styleName="home__title">Home page</h1>
      <Link to={RouteEnum.start} styleName="home__link">
        Go to start page
      </Link>
    </div>
  );
};

export default withError(React.memo(Home));
