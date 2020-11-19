// @flow

/**
 * Root component of app.
 *
 * This contains the Shopify client logic.
 */
import React, {useState} from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import {Link, graphql, useStaticQuery} from 'gatsby';

import GlobalStyles from '../styles/GlobalStyles';
import ContextProvider from '../provider/ContextProvider';

const Cart = loadable(() => import('./shopify/Cart'));

const Root = (props) => {
  const {children} = props;

  const {allShopifyCollection} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
        allShopifyCollection( sort: {fields: [title], order: ASC}) {
          edges {
            node {
              title
              handle
              products {
                handle
              }
            }
          }
        }
      }
    `,
  );

  const shopifyCollections = [];

  allShopifyCollection.edges.map(
    ({
      node: {
        title,
        handle,
        products
      }
    }) => (
      shopifyCollections.push({
        title: title,
        handle: handle,
        products: products
      })
  ));

  console.log(shopifyCollections);

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      shopifyCollections: shopifyCollections,
    });
  });

  return (
    <ContextProvider>
      <GlobalStyles />
      <RootDiv>
        {childrenWithProps}
        <Cart />
      </RootDiv>
    </ContextProvider>
  );
};

export default Root;

const RootDiv = styled.div`
  height: 100vh;
`;
