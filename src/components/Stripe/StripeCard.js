import React from 'react';
import {CardElement, CardNumberElement} from 'react-stripe-elements';

class Card extends React.Component {
  render() {
    return (
      <label>
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
};
 
export default Card