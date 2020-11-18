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
                ),
            )
      ) : (
        <p>No Products found!</p>
      );

    return (
      <>
        <SEO
          title={`${shopifyCollection.title}`}
          description={shopifyCollection.description}
          image={shopifyCollection.images ? shopifyCollection.images[0].originalSrc : ''} />

        <Layout location={this.props.location} >
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
        }
        availableForSale
      }
    }
  }
`;

const PageContainer = styled.div`
  margin-top: 150px;
  padding: 2.5vh 0 2.5vh 5vh;

  @media (max-width: 700px) {
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
`;

const CollectionDescription = styled.p`
  margin: 0 0 30px;
  color: #CC8E20;
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
