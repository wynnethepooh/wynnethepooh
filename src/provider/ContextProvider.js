import fetch from 'isomorphic-fetch';
import React, {useState, useEffect} from 'react';
import Client from 'shopify-buy';

import StoreContext from '../context/StoreContext';

const client = Client.buildClient(
    {
      storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
    },
    fetch,
);

const ContextProvider = ({children}) => {
  const initialStoreState = {
    client,
    adding: false,
    checkout: {lineItems: []},
    products: [],
    shop: {},
  };

  const [store, updateStore] = useState(initialStoreState);
  const [isCartOpen, setCartStatus] = useState(false);
  let isRemoved = false;

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined';
      const existingCheckoutID = isBrowser ?
        localStorage.getItem('shopify_checkout_id') :
        null;

      const setCheckoutInState = (checkout) => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id);
        }

        updateStore((prevState) => {
          return {...prevState, checkout};
        });
      };

      const createNewCheckout = () => store.client.checkout.create();
      const fetchCheckout = (id) => store.client.checkout.fetch(id);

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID);
          // Make sure this cart hasn’t already been purchased.
          if (!isRemoved && !checkout.completedAt) {
            setCheckoutInState(checkout);
            return;
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null);
          console.log(e);
        }
      }

      const newCheckout = await createNewCheckout();
      if (!isRemoved) {
        setCheckoutInState(newCheckout);
      }
    };

    initializeCheckout();
  }, [store.client.checkout]);

  useEffect(
      () => () => {
        isRemoved = true;
      },
      [],
  );

  return (
    <StoreContext.Provider
      value={{
        store,
        addVariantToCart: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.');
            return;
          }

          updateStore((prevState) => {
            return {...prevState, adding: true};
          });

          const {checkout, client} = store;

          const checkoutId = checkout.id;
          const lineItemsToUpdate = [
            {variantId, quantity: parseInt(quantity, 10)},
          ];

          return client.checkout
              .addLineItems(checkoutId, lineItemsToUpdate)
              .then((checkout) => {
                updateStore((prevState) => {
                  return {...prevState, checkout, adding: false, isCartOpen: true};
                });
              });
        },
        removeLineItem: (client, checkoutID, lineItemID) => {
          return client.checkout
              .removeLineItems(checkoutID, [lineItemID])
              .then((res) => {
                updateStore((prevState) => {
                  return {...prevState, checkout: res};
                });
              });
        },
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [
            {id: lineItemID, quantity: parseInt(quantity, 10)},
          ];

          return client.checkout
              .updateLineItems(checkoutID, lineItemsToUpdate)
              .then((res) => {
                updateStore((prevState) => {
                  return {...prevState, checkout: res};
                });
              });
        },
        isCartOpen,
        toggleCart: () => {
          setCartStatus((v) => !v);
        },
        openCart: () => {
          setCartStatus(true);
        },
        closeCart: () => {
          setCartStatus(false);
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default ContextProvider;
