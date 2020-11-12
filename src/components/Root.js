// @flow

/**
 * Root component of app.
 *
 * This contains the Shopify client logic.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Cart from './shopify/Cart';
import ContextProvider from '../provider/ContextProvider';

const Root = (props) => {
  const {children} = props;

  return (
    <ContextProvider>
      <GlobalStyles />
      <RootDiv>
        {React.cloneElement(children)}
        <Cart />
      </RootDiv>
    </ContextProvider>
  );
}

export default Root;

const RootDiv = styled.div`
  height: 100vh;
`;