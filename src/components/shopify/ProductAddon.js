// @flow
import React, {useState} from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import ProductForm from './ProductForm';

const ProductAddon = () => {

  const {shopifyProduct} = useStaticQuery(
    graphql`
      query {
        shopifyProduct(handle: { eq: "florals" }) {
          id
          title
          handle
          description
          descriptionHtml
          shopifyId
          options {
            id
            name
            values
          }
          variants {
            id
            title
            price
            compareAtPrice
            availableForSale
            shopifyId
            selectedOptions {
              name
              value
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            originalSrc
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          availableForSale
        }
      }
    `);

  return (
    <ProductOverview>
      <Img
        fluid={shopifyProduct.images[0].localFile.childImageSharp.fluid}
        alt={shopifyProduct.handle}/>

      <ProductDetails>
        <Title>{shopifyProduct.title}</Title>
        <ProductForm product={shopifyProduct} addon />
      </ProductDetails>
    </ProductOverview>
  )
};

export default ProductAddon;

const ProductOverview = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  border-top: solid;
  border-color: #CC8E20;
  border-width: 1px;
  padding-top: 30px;
`;


const ProductDetails = styled.div`
  max-width: 50%;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`;

const Img = styled(Image)`
  position: relative;
  width: 190px;
  height: 250px;
  margin-right: 20px;

  @media(max-width: 700px) {
    width: 30vw;
    height: 40vw;
  }
`;