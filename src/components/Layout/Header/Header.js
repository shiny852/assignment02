import { Fragment } from 'react';

import LogoIcon from './HeaderCartButton/LogoIcon/LogoIcon';

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton/HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes['header-items']}>
          <LogoIcon />
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
