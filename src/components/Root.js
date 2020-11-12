// @flow

/**
 * Root component of app.
 *
 * This contains the Shopify client logic.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import Cart from './shopify/Cart';
import CartButton from './navbar/CartButton';
import ContextProvider from '../provider/ContextProvider';

const Root = (props) => {
  const {children} = props;

  return (
    <ContextProvider>
      <RootDiv>
        {React.cloneElement(children)}
        <CartButton />
        <Cart />
      </RootDiv>
    </ContextProvider>
  );
}

export default Root;

const RootDiv = styled.div`
  height: 100vh;
`;