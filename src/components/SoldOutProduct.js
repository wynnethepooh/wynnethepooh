// @flow
import React, {useState} from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import ProductForm from './shopify/ProductForm';

const BuyProduct = React.memo(({product}) => {

  return (
    <ProductOverview>
      <DisplayBlock>
        <ProductBanner>
            Sold out
        </ProductBanner>
        {product.images.map(image => (
          <Img
            fluid={image.localFile.childImageSharp.fluid}
            key={image.id}
            alt={product.title}
          />
        ))}
      </DisplayBlock>
      <ProductDescription>
        <h1>{product.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: product.descriptionHtml,
          }} />


      </ProductDescription>
    </ProductOverview>
  );
});

BuyProduct.displayName = 'BuyProduct';
export default BuyProduct;

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

  @media (max-width: 700px) {
    margin: 20px 0;
  }
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
