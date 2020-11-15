// @flow

import React, { useContext } from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';
import Image from 'gatsby-image';
import get from 'lodash/get';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';
import styled from 'styled-components';

import StoreContext from '../context/StoreContext';
import SEO from '../components/seo';

const Layout = loadable(() => import('../components/layout'));

const Shop = () => {
    const {
      store: { checkout },
    } = useContext(StoreContext)

    const { allShopifyCollection } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
                author
              }
            }
            allShopifyCollection(sort: { fields: [products___availableForSale], order: DESC }) {
              edges {
                node {
                  title
                  products {
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
          }
        `
      )

    const getPrice = price =>
      Intl.NumberFormat(undefined, {
        currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
        minimumFractionDigits: 0,
        style: 'currency',
      }).format(parseFloat(price ? price : 0));

    const shopifyProductList = (products) =>
      products && products.length > 0 ? (
        products
          .sort((a,b) => b.availableForSale - a.availableForSale)
          .map(
            ({
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
              availableForSale
              ,
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

    const shopifyCollections = allShopifyCollection.edges ?
      allShopifyCollection.edges.map(
        ({
          node: {
            title,
            products
          }
        }) => (
          <>
            {products && products.length > 0 &&
              <CollectionDiv>
                <CollectionTitle>{title}</CollectionTitle>
                <ProductList>
                  {shopifyProductList(products)}
                </ProductList>
              </CollectionDiv>
            }
          </>
        )
      ) : (
        <p>No products found!</p>
      );

    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description',
    );



    return (
      <>
        <SEO title="shop | wynne the pooh" />
        <Layout>
          <Helmet
            htmlAttributes={{lang: 'en'}}
          >
            <title>shop | wynne the pooh</title>
            <meta name="description" content={siteDescription}/>
          </Helmet>
          <ShopPage>
            {shopifyCollections}
          </ShopPage>
        </Layout>
      </>
    );
}

type Props = {};

export default Shop;

const ShopPage = styled.div`
  padding: 2.5vh 0 2.5vh 5vh;

  @media (max-width: 700px) {
    padding: 2.5vh 3vh;
  }
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

const CollectionDiv = styled.div`
  margin: 50px 0 0 0;

  @media (max-width: 550px) {
    margin: 0 0 20px 0;
  }
`;

const CollectionTitle = styled.h1`
  color: #CD7F5D;
`;

const ProductDiv = styled.div`
  padding: 5px 0 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    padding: 0px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 45%;
  }
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
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

const ProductTitle = styled.p`
  overflow-wrap: break-word;
  text-align: left;
  padding-right: 10px;
  text-transform: lowercase;
  margin: 10px 0 0 0;
  font-size: 1rem;

  a {
    font-weight: normal;
    color: #52504B;
  }

`;

const ProductPrice = styled.p`
  font-weight: normal;
  white-space: nowrap;
  text-align: left;
  margin: 5px 0 0 0;
  font-size: 0.85rem;
`;

const Img = styled(Image)`
  position: relative;
  width: 250px;

  @media(max-width: 700px) {
    width: 40vw;
  }
`;
