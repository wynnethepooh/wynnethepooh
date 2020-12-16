import React from 'react';
import {Link, graphql} from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import get from 'lodash/get';
import loadable from '@loadable/component';

import SEO from '../components/seo';

const Layout = loadable(() => import('../components/layout'));

/**
 * Product template class.
 */
class CollectionPage extends React.Component {
  /**
   * Renders product template object.
   * @return {object} product template object
   */
  render() {
    const shopifyCollection = get(this, 'props.data.shopifyCollection');
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');

    const getPrice = (price) =>
      Intl.NumberFormat(undefined, {
        currency: 'USD',
        minimumFractionDigits: 0,
        style: 'currency',
      }).format(parseFloat(price ? price : 0));

    const shopifyProductList = (products) =>
      products && products.length > 0 ? (
        products
            .sort((a, b) => b.availableForSale - a.availableForSale)
            .map(
                ({
                  id,
                  handle,
                  title,
                  images: [firstImage],
                  variants: [firstVariant],
                  availableForSale,
                  tags,
                }) => (
                  <ProductDiv key={id}>
                    {!availableForSale &&
                      <SoldOutBanner>
                        Sold out
                      </SoldOutBanner>
                    }
                    {availableForSale && tags.includes('vase') &&
                      <ProductBanner>
                        florals<br/>available
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
                      <PriceFlexbox>
                        {!availableForSale &&
                          <strike>
                            <ProductPrice>{getPrice(firstVariant.price)}</ProductPrice>
                          </strike>
                        }
                        {availableForSale && firstVariant.compareAtPrice &&
                          <>
                            <strike>
                              <ProductPrice>{getPrice(firstVariant.compareAtPrice)}</ProductPrice>
                            </strike>
                            <SaleProductPrice>{getPrice(firstVariant.price)}</SaleProductPrice>
                          </>
                        }
                        {availableForSale && !firstVariant.compareAtPrice &&
                          <ProductPrice>{getPrice(firstVariant.price)}</ProductPrice>
                        }
                      </PriceFlexbox>
                    </ProductInformation>
                  </ProductDiv>
                ),
            )
      ) : (
        <NoProductsDiv>No Products found!</NoProductsDiv>
      );

    return (
      <>
        <SEO
          title={`${shopifyCollection.title}`}
          description={shopifyCollection.description}
          image={shopifyCollection.images ? shopifyCollection.images[0].originalSrc : ''} />

        <Layout location={this.props.location} shopifyCollections={this.props.shopifyCollections}>
          <PageContainer>
            <Link
              to="/shop"
              style={{
                display: 'flex',
                marginBottom: '20px',
                textTransform: 'lowercase',
                zIndex: '12',
                width: 'fit-content',
              }}>
              ← shop all
            </Link>
            <p>
            </p>

            <CollectionDiv>
              <CollectionTitle>{shopifyCollection.title}</CollectionTitle>
              <CollectionDescription>{shopifyCollection.description}</CollectionDescription>
              <ProductList>
                {shopifyProductList(shopifyCollection.products)}
              </ProductList>
            </CollectionDiv>
          </PageContainer>
        </Layout>
      </>
    );
  }
}

export default CollectionPage;

export const query = graphql`
  query($handle: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    shopifyCollection(handle: { eq: $handle }) {
      title
      description
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
          compareAtPrice
        }
        tags
        availableForSale
      }
    }
  }
`;

const PageContainer = styled.div`
  margin-top: 150px;
  padding: 2.5vh 0 2.5vh 5vh;

  @media (max-width: 550px) {
    margin-top: 100px;
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
  margin: 30px 0 0 0;

  @media (max-width: 550px) {
    margin: 0 0 20px 0;
  }
`;

const CollectionTitle = styled.h1`
  color: #CC8E20;
  padding-bottom: 5px;
  text-align: center;
`;

const CollectionDescription = styled.p`
  margin: 0 0 30px;
  color: #CC8E20;
  text-align: center;
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

const SoldOutBanner = styled.div`
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

const ProductBanner = styled.div`
  text-transform: lowercase;
  position: absolute;
  top: 35px;
  right: -10px;
  background-color: #CC8E20;
  color: white;
  padding: 3px 7px;
  z-index: 1;
  width: 85px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    width: 55px;
    height: 60px;
    font-size: small;
    top: 10px;
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

const PriceFlexbox = styled.div`
  display: flex;
`;

const ProductPrice = styled.p`
  font-weight: normal;
  white-space: nowrap;
  text-align: left;
  margin: 5px 0 0 0;
  font-size: 0.85rem;
`;

const SaleProductPrice = styled.p`
  font-weight: 500;
  white-space: nowrap;
  text-align: left;
  margin: 5px 0 0 0;
  font-size: 0.85rem;
  color: #CD7F5D;
  display: inline-block;
  margin-left: 10px;
`;

const Img = styled(Image)`
  position: relative;
  width: 250px;

  @media(max-width: 700px) {
    width: 40vw;
  }
`;

const NoProductsDiv = styled.div`
  width: 100%;
  text-align: center;
`;