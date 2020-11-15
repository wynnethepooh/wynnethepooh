// @flow
import React, {useState} from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import ProductForm from './ProductForm';

const Product = React.memo(({product, soldOut}) => {

  return (
    <ProductOverview>
      <DisplayBlock>
        {soldOut &&
          <ProductBanner>
              Sold out
          </ProductBanner>
        }
        {product.images.map(image => (
          <Img
            fluid={image.localFile.childImageSharp.fluid}
            key={image.id}
            alt={product.title}
          />
        ))}
      </DisplayBlock>

      <ProductDetails>
        <h1>{product.title}</h1>
        {soldOut &&
          <div
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml,
            }} />
        }
        {!soldOut &&
          <ProductForm product={product} />
        }
      </ProductDetails>
    </ProductOverview>
  );
});

Product.displayName = 'Product';
export default Product;

const ProductOverview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ProductDetails = styled.div`
  margin-left: 2.5vh;
  text-align: left;
  text-transform: lowercase;

  @media (max-width: 700px) {
    margin: 20px 0;
  }
`;

const BuyButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CustomField = styled.div`
  display: flex;
`;

const SelectWrapper = styled.div`
  overflow: hidden;
  position: relative;

  :after {
    content: "▾";
    padding: 12px 8px;
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
    text-align: center;
    width: 10%;
    pointer-events: none;
  }
`;

const Select = styled.select`
  border-radius: 0;
  border-color: #e0dcd1;
  padding: 15px;
  padding-right: 30px;
  margin-right: 10px;
  margin-bottom: 20px;
  -webkit-appearance: none;
  background-color: #FAF6EB;
  color: #52504B;
  font-size: 15px;
  font-family: 'Jost', sans-serif;
  text-transform: lowercase;
`;

const Dimensions = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
`;

const DimensionsHeader = styled.h4`
  margin: 7px 0;
  font-weight: 500;
`;

const ProductDescription = styled.div`
  text-transform: lowercase;
  text-align: left;

  @media (max-width: 700px) {
    margin: 20px 0;
  }
`;

const Img = styled(Image)`
  position: relative;
  width: 400px;
  min-width: 400px;

  @media (max-width: 700px) {
    width: 80vw;
    min-width: 80vw;
  }
`;

const DisplayBlock = styled.div`
  position: relative;
  display: inline-block;
`;

const ProductBanner = styled.div`
  text-transform: lowercase;
  position: absolute;
  top: 40px;
  right: -7px;
  background-color: #CD7F5D;
  color: white;
  padding: 3px 7px;
  z-index: 1;
`;