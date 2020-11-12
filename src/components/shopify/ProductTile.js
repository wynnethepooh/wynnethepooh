import React, {Component} from 'react';
import styled from 'styled-components';
import VariantSelector from './VariantSelector';

class ProductTile extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    const soldOut = !this.props.product.availableForSale;
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });

    return (
      <ProductDiv>
        {soldOut &&
          <ProductBanner>
            Sold out
          </ProductBanner>
        }
        {this.props.product.images.length ? <ProductImage src={variantImage.src} alt={`${this.props.product.title} product shot`}/> : null}
        <ProductInformation>
          <ProductTitle>
            {this.props.product.title}
          </ProductTitle>
          {soldOut &&
            <strike>
              <ProductPrice>
                ${variant.price}
              </ProductPrice>
            </strike>
          }
          {!soldOut &&
            <ProductPrice>
              ${variant.price}
            </ProductPrice>
          }
        </ProductInformation>
        <button className="Product__buy button" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
      </ProductDiv>
    );
  }
}

export default ProductTile;

const ProductDiv = styled.div`
  padding: 30px 0 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 700px) {
    padding: 0px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 45%;
  }
`;

const ProductBanner = styled.div`
  text-transform: lowercase;
  position: absolute;
  top: 40px;
  right: -5px;
  background-color: #CD7F5D;
  color: white;
  padding: 3px 7px;

  @media (max-width: 700px) {
    top: 15px;
    right: -5px;
  }
`;

const ProductImage = styled.img`
  width: 250px;

  @media(max-width: 700px) {
    width: 100%;
  }
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 250px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ProductTitle = styled.h3`
  overflow-wrap: break-word;
  text-align: left;
  padding-right: 10px;
  text-transform: lowercase;
  margin: 10px 0;
  font-size: 1rem;
`;

const ProductPrice = styled.h3`
  font-weight: normal;
  white-space: nowrap;
  text-align: right;
  margin: 10px 0;
  font-size: 1rem;
`;