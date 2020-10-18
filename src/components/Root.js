// @flow

/**
 * Root component of app.
 *
 * This contains the Shopify client logic.
 */
import React from 'react';
import styled from 'styled-components';
import Cart from './shopify/Cart';

/**
 * Root component.
 */
class Root extends React.Component<Props, State> {
  /**
   * Constructor.
   * @param {object} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  componentWillMount() {
    this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    });

    this.props.client.product.fetchAll().then((res) => {
      this.setState({
        products: res,
      });
    });

    this.props.client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  /**
   * Renders Root object.
   * @return {object} Root object
   */
  render() {
    const {children} = this.props;

    return (
      <RootDiv>
        {children}
        {!this.state.isCartOpen &&
          <CartButtonWrapper className="App__view-cart-wrapper">
            <CartButton className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}></CartButton>
          </CartButtonWrapper>
        }
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </RootDiv>
    );
  }
}

type State = {
}

type Props = {
};

export default Root;

const RootDiv = styled.div`
  height: 100vh;
`;

const CartButtonWrapper = styled.div`
  position: fixed;
  right: 51px;
  top: 27px;
  z-index: 11;
`;

const CartButton = styled.button`
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