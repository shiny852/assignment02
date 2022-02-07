import { useContext, lazy, Suspense } from 'react';

import CartContext from '../../../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const CartIcon = lazy(() => import('../../../Cart/CartIcons/CartIcon'));

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button
      className={classes.button}
      onClick={props.onClick}
      aria-label='cart-icon'
    >
      <span className={classes.icon}>
        <Suspense fallback={<div>Loading...</div>}>
          <CartIcon />
        </Suspense>
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
