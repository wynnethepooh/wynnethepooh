// @flow

import React, { useContext } from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';
import Image from 'gatsby-image';
import get from 'lodash/get';
import {Helmet} from 'react-helmet';

import Layout from '../components/layout';
import styled from 'styled-components';
import StoreContext from '../context/StoreContext';

const Shop = () => {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(
        this,
        'props.data.site.siteMetadata.description',
    );

    const {
      store: { checkout },
    } = useContext(StoreContext)

    const { allShopifyProduct } = useStaticQuery(
        graphql`
          query {
            allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
              edges {
                node {
                  id
                  title
                  handle
                  createdAt
                  images {
                    id
                    originalSrc
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 910) {
                          ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                      }
                    }
                  }
                  variants {
                    price
                  }
                  availableForSale
                }
              }
            }
          }
        `
      )

    const getPrice = price =>
      Intl.NumberFormat(undefined, {
        currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
        minimumFractionDigits: 0,
        style: 'currency',
      }).format(parseFloat(price ? price : 0))

    const shopifyProductList =
      allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
              availableForSale
            },
          }) => (
            <ProductDiv key={id}>
              {!availableForSale &&
                <ProductBanner>
                  Sold out
                </ProductBanner>
              }
              <Link to={`/product/${handle}/`}>
                {firstImage && firstImage.localFile && (
                  <Img
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
              </Link>
              <ProductInformation>
                <ProductTitle>
                  <Link style={{boxShadow: 'none'}} to={`/product/${handle}/`}>
                    {title}
                  </Link>
                </ProductTitle>
                {!availableForSale &&
                  <strike>
                    <ProductPrice>{getPrice(firstVariant.price)}</ProductPrice>
                  </strike>
                }
                {availableForSale &&
                  <ProductPrice>{getPrice(firstVariant.price)}</ProductPrice>
                }
              </ProductInformation>
            </ProductDiv>
          )
        )
      ) : (
        <p>No Products found!</p>
      );

    return (
      <Layout>
        <Helmet
          htmlAttributes={{lang: 'en'}}
        >
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription}/>
        </Helmet>
        <ShopPage>
          <h1>shop</h1>
          <ProductList>
            {shopifyProductList}
          </ProductList>
        </ShopPage>
      </Layout>

    );
//  }
}

type Props = {};

export default Shop;

const ShopPage = styled.div`
  padding: 2.5vh 5vh
`;

const ProductList = styled.div`
  position: relative;
  left: -50px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    left: 0;
    justify-content: space-between;
  }
`;

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

const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 250px;

  @media (max-width: 700px) {
    width: 100%;
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
  z-index: 1;

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

const Img = styled(Image)`
  position: relative;
  width: 250px;

  @media(max-width: 700px) {
    width: 35vw;
  }
`;
