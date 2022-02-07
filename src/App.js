import { useState, lazy, Suspense } from 'react';

import CartProvider from './store/CartProvider';

import '@fontsource/archivo';

const Cart = lazy(() => import('./components/Cart/Cart'));
const Header = lazy(() => import('./components/Layout/Header/Header'));
const Products = lazy(() => import('./components/Products/Products'));

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Suspense fallback={<p>Loading...</p>}>
          <Cart onClose={hideCartHandler} />
        </Suspense>
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <Header onShowCart={showCartHandler} />
      </Suspense>

      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Products />
        </Suspense>
      </main>
    </CartProvider>
  );
}

export default App;
