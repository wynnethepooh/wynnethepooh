import React, { useContext } from 'react';
import styled from 'styled-components';
import StoreContext from '../../context/StoreContext';

import ShoppingBag from '../../images/shopping-bag.png';

const CartButton = (props: Props) => {
  const storeContext = useContext(StoreContext);

  return (
    <CartWrapper className="App__view-cart-wrapper">
      <ViewCartButton className="App__view-cart" onClick={storeContext.toggleCart}>
        <ShoppingCartWrapper>
          <ShoppingIcon ishomepage={props.ishomepage} src={ShoppingBag} />
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