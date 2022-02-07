import { useState, useContext, lazy, Suspense } from 'react';

import classes from './ProductItem.module.css';
import CartContext from '../../../store/cart-context';

const ProductItemForm = lazy(() => import('./ProductItemForm/ProductItemForm'));

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const [style, setStyle] = useState({ display: 'none' });
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
    });
  };

  return (
    <li
      className={classes.product}
      onMouseEnter={(e) => {
        setStyle({ display: 'flex' });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: 'none' });
      }}
    >
      <div>
        <div className={classes['image-wrapper']}>
          {props.bestseller && (
            <div className={classes.bestseller}>Best Seller</div>
          )}

          <img
            src={props.image.src}
            alt={props.image.alt}
            rel='preconnect'
            className={classes.image}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <ProductItemForm
              style={style}
              onAddToCart={addToCartHandler}
              id={props.id}
            />
          </Suspense>
        </div>
        <div className={classes.category}>{props.category}</div>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{price}</div>
      </div>
    </li>
  );
};

export default ProductItem;
