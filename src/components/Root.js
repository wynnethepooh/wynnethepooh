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
import Mailchimp from 'react-mailchimp-form';

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

  allShopifyCollection.edges
    .filter(({ node: { handle } }) => (
        handle.includes("new-arrivals")
      ))
    .map(
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

  allShopifyCollection.edges
    .filter(({ node: { handle }}) => (
        !handle.includes("new-arrivals")
      ))
    .map(
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

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      shopifyCollections: shopifyCollections,
    });
  });

  const [subscriptionHidden, hideSubscription] = useState(false);

  const handleCloseSubscription = () => {
    hideSubscription(true);
  }

  return (
    <ContextProvider>
      <GlobalStyles />
      <RootDiv>
        {childrenWithProps}
        <SubscribeWrapper subscriptionHidden={subscriptionHidden}>
          <p>sign up to get notifications on shop updates!</p>
          <Mailchimp
            action='https://wynnethepooh.us7.list-manage.com/subscribe/post?u=dc95ecf4a0579009ef8d866dd&amp;id=ed3668d013'
            fields={[
              {
                name: 'EMAIL',
                placeholder: 'email',
                type: 'email',
                required: true
              }
            ]}
            messages = {
              {
                sending: "sending...",
                success: "thank you for subscribing!",
                error: "an unexpected internal error has occurred.",
                empty: "email field required",
                duplicate: "you're already subscribed :)",
                button: "subscribe"
              }
            }
            // Add a personalized class
            className='subscription'
            />
          <CloseButton onClick={handleCloseSubscription}>
            ×
          </CloseButton>
        </SubscribeWrapper>
        <Cart />
      </RootDiv>
    </ContextProvider>
  );
};

export default Root;

const RootDiv = styled.div`
  height: 100vh;
`;

const SubscribeWrapper = styled.div`
  bottom: ${(props) => (props.subscriptionHidden ? '-260px !important' : '0')};
  position: fixed;
  bottom: 0;
  z-index: 11;
  padding: 20px 0;
  background: #faedd7;
  width: 100%;
  text-align: center;

  -o-transition:.3s;
  -ms-transition:.3s;
  -moz-transition:.3s;
  -webkit-transition:.3s;
  transition:.3s;

  @media (max-width: 381px) {
    padding: 40px 0;
  }

  p {
     text-align: center;
     margin-bottom: 20px;

     @media (max-width: 381px) {
       margin: 0 20px 20px;
     }
  }

  .subscription {

    @media (max-width: 381px) {
      display: flex !important;
      justify-content: center !important;
      flex-direction: column;
    }

    input {
      border: none;
      border-radius: 3px;
      padding: 10px;
      margin-right: 15px;

      @media (max-width: 381px) {
        margin: 0 20px 10px;
      }
    }

    button {
      padding: 10px;
      color: white;
      font-family: 'Jost', sans-serif;
      background: #CD7F5D;
      border: none;
      border-radius: 3px;

      @media (max-width: 381px) {
        margin: 0 20px 0;
      }
    }

    .msg-alert {
      p {
        color: #CC8E20 !important;
        font-style: italic !important;
        font-size: small !important;
        margin: 5px 0 0 !important;
        text-align: center !important;

        @media (max-width: 381px) {
          margin: 0 20px 0;
        }
      }
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  outline: none;
  cursor: pointer;
  border: none;
  color: #CC8E20;
  font-family: 'Jost', sans-serif;
  margin: 10px 0 15px 0;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: -15px;
  right: 5px;
`;
