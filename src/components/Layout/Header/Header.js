import { Fragment, lazy, Suspense } from 'react';

import classes from './Header.module.css';

const LogoIcon = lazy(() => import('./HeaderCartButton/LogoIcon/LogoIcon'));
const HeaderCartButton = lazy(() =>
  import('./HeaderCartButton/HeaderCartButton'),
);

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes['header-items']}>
          <Suspense fallback={<div>Loading...</div>}>
            <LogoIcon />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderCartButton onClick={props.onShowCart} />
          </Suspense>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
