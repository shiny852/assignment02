import { lazy, Suspense } from 'react';
import Modal from '../../UI/Modal/Modal';
import classes from './ProductsFilters.module.css';

const CheckboxProton = lazy(() =>
  import('../../UI/CheckboxProton/CheckboxProton'),
);
const PriceRangeCheckBox = lazy(() =>
  import('../../UI/PriceRangeCheckbox/PriceRangeCheckbox'),
);
const CloseIcon = lazy(() => import('../../Cart/CartIcons/CloseIcon'));

const ProductsFilters = ({
  products,
  changeChecked,
  priceRange,
  selectPriceRange,
  responsive,
  responsiveNone,
  onClose,
}) => {
  const desktopContent = (
    <section className={classes.filters}>
      <div className={classes['multiple-filters']}>
        <h3 className={classes['category-title']}>Category</h3>
        <ul className={classes['category-body']}>
          <Suspense fallback={<div>Loading...</div>}>
            {products.map((product, index) => (
              <CheckboxProton
                index={index}
                key={product.id}
                product={product}
                changeChecked={changeChecked}
              />
            ))}
          </Suspense>
        </ul>
      </div>
      <div className={classes['single-filters']}>
        <h3>Price range</h3>
        <ul>
          <Suspense fallback={<div>Loading...</div>}>
            {priceRange.map((item, index) => (
              <PriceRangeCheckBox
                index={index}
                key={item.id}
                item={item}
                selectPriceRange={selectPriceRange}
              />
            ))}
          </Suspense>
        </ul>
      </div>
    </section>
  );

  const responsiveContent = (
    <Modal className={classes['responsive-filters']} onClose={onClose}>
      <section className={classes['responsive-filters-content']}>
        <div className={classes['multiple-filters']}>
          <div className={classes['filters-header']}>
            <h3>Filter</h3>
            <button onClick={onClose} aria-label='close-filters-icon'>
              <Suspense fallback={<div>Loading...</div>}>
                <CloseIcon />
              </Suspense>
            </button>
          </div>
          <h3 className={classes['category-title']}>Category</h3>
          <ul className={classes['category-body']}>
            <Suspense fallback={<div>Loading...</div>}>
              {products.map((product, index) => (
                <CheckboxProton
                  index={index}
                  key={product.id}
                  product={product}
                  changeChecked={changeChecked}
                />
              ))}{' '}
            </Suspense>
          </ul>
        </div>
        <div className={classes['single-filters']}>
          <h3>Price range</h3>
          <ul>
            <Suspense fallback={<div>Loading...</div>}>
              {priceRange.map((item, index) => (
                <PriceRangeCheckBox
                  index={index}
                  key={item.id}
                  item={item}
                  selectPriceRange={selectPriceRange}
                />
              ))}{' '}
            </Suspense>
          </ul>
        </div>
      </section>
    </Modal>
  );

  return (
    <>
      {responsiveNone && desktopContent}
      {responsive && responsiveContent}
    </>
  );
};

export default ProductsFilters;
