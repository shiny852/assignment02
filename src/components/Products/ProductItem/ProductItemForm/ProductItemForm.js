import { useRef, useState } from 'react';
import Input from '../../../UI/Input/Input';
import classes from './ProductItemForm.module.css';

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

      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default ProductItemForm;
