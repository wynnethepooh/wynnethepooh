// @flow

/**
 * Root component of app.
 *
 * This contains the Shopify client logic.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

import GlobalStyles from '../styles/GlobalStyles';
import ContextProvider from '../provider/ContextProvider';

const Cart = loadable(() => import('./shopify/Cart'));

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