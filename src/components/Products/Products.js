import { Fragment, useState, useEffect } from 'react';
import ProductsFilters from './ProductsFilters/ProductsFilters';
import AvailableProducts from './AvailableProducts/AvailableProducts';

import classes from './Products.module.css';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';
import SortIcon from './SortIcon/SortIcon';
import ProductsFiltersIcon from './ProductsFilters/ProductsFiltersIcon/ProductsFiltersIcon';

const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'ABoat',
    category: 'people',
    price: 3.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/4350202/pexels-photo-4350202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Boat Img',
    },
    bestseller: true,
    featured: false,
    details: null,
  },
  {
    id: '2',
    name: 'Red Bench',
    category: 'premium',
    price: 4.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/60342/pexels-photo-60342.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Bench Img',
    },
    bestseller: true,
    featured: false,
    details: null,
  },
  {
    id: '3',
    name: 'Egg Balloon',
    category: 'food',
    price: 93.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/271654/pexels-photo-271654.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Balloon Img',
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    id: '4',
    name: 'Boat',
    category: 'pets',
    price: 5.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Boat Img',
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    id: '5',
    name: 'CBoat',
    category: 'landmarks',
    price: 6.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Boat Img',
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    id: '6',
    name: 'DBoat',
    category: 'cities',
    price: 7.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Boat Img',
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    id: '7',
    name: 'EBoat',
    category: 'nature',
    price: 8.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Boat Img',
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    id: '8',
    name: 'FBoat',
    category: 'people',
    price: 9.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      alt: 'Boat Img',
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    id: '9',
    name: 'Samurai King Resting',
    category: 'people',
    price: 10.89,
    currency: 'USD',
    image: {
      src: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
      alt: 'featured',
    },
    bestseller: false,
    featured: true,
    details: {
      dimensions: {
        width: 1020,
        height: 1020,
      },
      size: 15000,
      description:
        'So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.',
      recommendations: [
        {
          src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200',
          alt: 'plant',
        },
        {
          src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200',
          alt: 'plant',
        },
        {
          src: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200',
          alt: 'plant',
        },
      ],
    },
  },
];

const Products = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [sortBy, setSortBy] = useState('alphabetically');
  const [filtersAreShown, setFiltersAreShown] = useState(false);
  const [priceRange, setPriceRange] = useState([
    {
      id: 0,
      label: 'Lower then $20',
      array: [0, 19],
      checked: false,
    },
    {
      id: 1,
      label: '$20 - $100',
      array: [20, 99],
      checked: false,
    },
    {
      id: 2,
      label: '$100 - $200',
      array: [100, 199],
      checked: false,
    },
    {
      id: 3,
      label: 'More then $200',
      array: [200, 1500000],
      checked: false,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://assignment02-1a084-default-rtdb.europe-west1.firebasedatabase.app/products.json',
      );
      const responseData = await response.json();

      const loadedProducts = Object.values(responseData).map((p, index) => ({
        ...p,
        id: index,
      }));
      setFetchedProducts(loadedProducts);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newProducts = [
      ...fetchedProducts
        .filter((item) => item.featured === false)
        .reduce((map, obj) => map.set(obj.category, obj), new Map())
        .values(),
    ].map((item) => ({ ...item, checked: false }));

    setProducts(newProducts);
  }, [fetchedProducts]);

  const handleSelectPriceRange = (event) => {
    const id = +event.target.value;
    const priceRangeStateList = priceRange;
    const changeSelectedPriceRange = priceRangeStateList.find((item) => {
      return item.id === id;
    });
    setSelectedPriceRange(changeSelectedPriceRange);
  };

  const handleChangeChecked = (id) => {
    const productsStateList = products;
    const changeCheckedProducts = productsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setProducts(changeCheckedProducts);
  };

  const handleOnSort = () => {
    if (sortType === null || sortType === 'desc') {
      setSortType('asc');
    } else {
      setSortType('desc');
    }
  };

  const handleSortBy = (event, value) => {
    setSortBy(event.target.value);
  };

  const showFiltersHandler = () => {
    setFiltersAreShown(true);
  };

  const hideFiltersHandler = () => {
    setFiltersAreShown(false);
  };

  const applyFilters = () => {
    let updatedList = fetchedProducts.filter((item) => item.featured === false);

    // Category Filter
    const productChecked = products
      .filter((item) => item.checked)
      .map((item) => item.category.toLocaleLowerCase());

    if (productChecked.length) {
      updatedList = updatedList.filter((item) =>
        productChecked.includes(item.category),
      );
    }

    // PriceRange Filter

    if (selectedPriceRange) {
      const minPrice = selectedPriceRange.array[0];
      const maxPrice = selectedPriceRange.array[1];
      updatedList = updatedList.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice,
      );
    }

    // Sorting by alphabet
    if (sortBy === 'alphabetically' && sortType) {
      updatedList = updatedList.sort((a, b) => {
        const isReversed = sortType === 'asc' ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      });
    }

    if (sortBy === 'byPrice' && sortType) {
      updatedList = updatedList.sort((a, b) => {
        const isPriceReversed =
          sortType === 'asc' ? a.price - b.price : b.price - a.price;
        return isPriceReversed;
      });
    }

    setList(updatedList);
  };

  useEffect(() => {
    applyFilters();
  }, [products, selectedPriceRange, sortType, sortBy, fetchedProducts]);

  const featuredProducts = fetchedProducts.filter((item) => item.featured);

  return (
    <Fragment>
      {featuredProducts.map((item, index) => (
        <FeaturedProduct item={item} key={index} />
      ))}
      <div className={classes['products-topbar']}>
        <div className={classes['topbar-heading']}>
          <h3>Products </h3> &nbsp;/&nbsp; <span> Steps</span>
        </div>

        <div className={classes['topbar-actions']}>
          <div>
            <button
              className={classes.sort}
              onClick={handleOnSort}
              name='aria-label'
            >
              <SortIcon />
            </button>
            <span>Sort By</span>&nbsp;
            <select onChange={handleSortBy} value={sortBy}>
              <option value='alphabetically'>Alphabet</option>
              <option value='byPrice'>Price</option>
            </select>
          </div>

          <button
            className={classes['responsive-icon']}
            onClick={showFiltersHandler}
            name='aria-label'
          >
            <ProductsFiltersIcon />
          </button>
        </div>
      </div>
      <div className={classes['products-main']}>
        <ProductsFilters
          responsiveNone
          products={products}
          changeChecked={handleChangeChecked}
          priceRange={priceRange}
          selectPriceRange={handleSelectPriceRange}
        />
        {filtersAreShown && (
          <ProductsFilters
            responsive
            products={products}
            changeChecked={handleChangeChecked}
            priceRange={priceRange}
            selectPriceRange={handleSelectPriceRange}
            onClose={hideFiltersHandler}
          />
        )}
        <AvailableProducts list={list} />
      </div>
    </Fragment>
  );
};

export default Products;
