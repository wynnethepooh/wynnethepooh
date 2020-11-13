import React, { useContext } from 'react';
import reduce from 'lodash/reduce';
import styled from 'styled-components';
import StoreContext from '../../context/StoreContext';

import ShoppingBag from '../../images/shopping-bag.png';

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const CartButton = (props: Props) => {
  const storeContext = useContext(StoreContext);
  const [hasItems, quantity] = useQuantity()

  return (
    <CartWrapper className="App__view-cart-wrapper">
      <ViewCartButton className="App__view-cart" onClick={storeContext.toggleCart}>
        <ShoppingCartWrapper>
          <ShoppingIcon
            src={ShoppingBag}
            ishomepage={props.ishomepage} />
          {hasItems &&
            <CartCounter>
              {quantity}
            </CartCounter>
          }
        </ShoppingCartWrapper>
      </ViewCartButton>
    </CartWrapper>
  )
}

export default CartButton;

const CartWrapper = styled.div`
  position: fixed;
  right: -50px;
  top: -3px;
  z-index: 11;
`;

const ViewCartButton = styled.button`
  background: none;
  border: none;
  height: 35px;
  width: 35px;
  cursor: pointer;

  @media (max-width: 1020px) {
    position: absolute;
    right: 15px;
    top: 3px;
  }
`;

const ShoppingCartWrapper = styled.div`
  position: relative;
  background: none;
  display: inline;

  @media (max-width: 1020px) {
    position: absolute;
    right: 27px;
    top: -16px;
  }
`;

const ShoppingIcon = styled.img`
  height: 25px;
  margin: 19px -12px 0 0;

  @media (min-width: 1020px) {
    margin: auto auto -3px auto;
  }
`;

const CartCounter = styled.div`
  background-color: #CD7F5D;
  color: white;
  font-family: 'Jost', sans-serif;
  font-size: smaller;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin: auto;
  text-align: center;
  right: -27px;
  top: 20px;
  position: fixed;
  line-height: 20px;

  @media (min-width: 1020px) {
    right: -53px;
    top: 19px;
  }
`;