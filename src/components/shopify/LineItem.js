import React, {Component} from 'react';
import styled from 'styled-components';

class LineItem extends Component {
  constructor(props) {
    super(props);

    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
  }

  decrementQuantity(lineItemId) {
    const updatedQuantity = this.props.line_item.quantity - 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  incrementQuantity(lineItemId) {
    const updatedQuantity = this.props.line_item.quantity + 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  render() {
    return (
      <ListItem className="Line-item">
        <div className="Line-item__img">
          {this.props.line_item.variant.image ? <ProductImage src={this.props.line_item.variant.image.src} alt={`${this.props.line_item.title} product shot`}/> : null}
        </div>
        <Content className="Line-item__content">
          <div className="Line-item__content-row">
            <Title className="Line-item__title">
              {this.props.line_item.title}
            </Title>
            <VariantTitle className="Line-item__variant-title">
              {this.props.line_item.variant.title}
            </VariantTitle>
          </div>
          <div className="Line-item__content-row">
            <QuantityContainer className="Line-item__quantity-container">
              <QuantityUpdate className="Line-item__quantity-update" onClick={() => this.decrementQuantity(this.props.line_item.id)}>-</QuantityUpdate>
              <Quantity className="Line-item__quantity">{this.props.line_item.quantity}</Quantity>
              <QuantityUpdate className="Line-item__quantity-update" onClick={() => this.incrementQuantity(this.props.line_item.id)}>+</QuantityUpdate>
            </QuantityContainer>
            <PriceRow>
              <span className="Line-item__price">
                $ { (this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2) }
              </span>
              <RemoveButton className="Line-item__remove" onClick={()=> this.props.removeLineItemInCart(this.props.line_item.id)}>remove</RemoveButton>
            </PriceRow>
          </div>
        </Content>
      </ListItem>
    );
  }
}

export default LineItem;

const ProductImage = styled.img`
  width: 70px;
`;

const ListItem = styled.li`
  display: flex;
`;

const Content = styled.div`
  padding: 0 0 0 20px;
`;

const Title = styled.div`
`;

const VariantTitle = styled.div`
  font-size: smaller;
`;

const QuantityContainer = styled.div`
  padding: 10px 0 10px 0
`;

const QuantityUpdate = styled.button`
  border: none;
  background: none;
  font-size: larger;
  padding: 0;
  cursor: pointer;
`;

const Quantity = styled.span`
  margin: 0 10px 0 10px
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  font-family: 'Jost', sans-serif;
  cursor: pointer;
`;