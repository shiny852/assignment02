import { useRef, useState, lazy, Suspense } from 'react';

import classes from './ProductItemForm.module.css';

const Input = lazy(() => import('../../../UI/Input/Input'));

const ProductItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} style={props.style} onSubmit={submitHandler}>
      <button>Add to cart</button>
      <Suspense fallback={<div>Loading...</div>}>
        <Input
          ref={amountInputRef}
          input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
          }}
        />
      </Suspense>

      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default ProductItemForm;
