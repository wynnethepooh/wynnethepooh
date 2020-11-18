import React from 'react';

const StoreContext = React.createContext({
  isCartOpen: false,
  setCartStatus: () => {},
});

export default StoreContext;
