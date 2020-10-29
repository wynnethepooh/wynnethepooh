import React, {Component} from 'react';
import styled from 'styled-components';
import LineItem from './LineItem';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    let line_items = this.props.checkout.lineItems.map((line_item) => {
      return (
        <LineItem
          updateQuantityInCart={this.props.updateQuantityInCart}
          removeLineItemInCart={this.props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });
    const hasItems = line_items?.length > 0;

    return (
      <CartWrapper
          className={`Cart ${this.props.isCartOpen ? 'Cart--open' : ''}`}
          isCartOpen={this.props.isCartOpen}>
        <CartHeader className="Cart__header">
          <Header>Your cart</Header>
          <CloseButton
            onClick={this.props.handleCartClose}
            className="Cart__close">
            ×
          </CloseButton>
        </CartHeader>
        {hasItems &&
          <LineItemList className="Cart__line-items">
            {line_items}
          </LineItemList>
        }
        {!hasItems &&
          <EmptyMessage>
            your cart is empty.
            <br/>fill &#39;er up!
          </EmptyMessage>
        }
        <Footer className="Cart__footer">
          <FooterLine className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.subtotalPrice}</span>
            </div>
          </FooterLine>
          <FooterLine className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalTax}</span>
            </div>
          </FooterLine>
          <FooterLine className="Cart-info clearfix" isTotal>
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalPrice}</span>
            </div>
          </FooterLine>
          <CheckoutButton
              className="Cart__checkout button"
              onClick={this.openCheckout}>
            Checkout
          </CheckoutButton>
        </Footer>
      </CartWrapper>
    )
  }
}

export default Cart;

const CartWrapper = styled.div`
  text-transform: lowercase;
  position: fixed;

  -o-transition:.3s;
  -ms-transition:.3s;
  -moz-transition:.3s;
  -webkit-transition:.3s;
  transition:.3s;

  right: ${(props) => (props.isCartOpen ? '0' : '-350px')};
  width: 300px;
  height: 100%;
  top: 0;
  padding: 0 25px;
  z-index: 12;

  background: #FFFCF5;
`;

const CartHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.h1`
  padding: 15px 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #CC8E20;
  font-family: 'Jost', sans-serif;
  margin: 10px 0 15px 0;
  font-size: 30px;
  cursor: pointer;
`;

const Footer = styled.footer`
  color: #52504B;
  width: 100%;
  padding: 20px 0 0 0;

  flex-direction: column;
`;

const FooterLine = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: ${(props) => (props.isTotal ? '500' : '')};
`;

const CheckoutButton = styled.button`
  text-transform: lowercase;
  color: white;
  width: 100%;
  background: #CD7F5D;
  border: none;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;

  :disabled {
    cursor: auto;
    background: #D19F8A;
  }
`;

const EmptyMessage = styled.div`
  margin: 40px;
  text-align: center;
`;

const LineItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;