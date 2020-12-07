import React from 'react';
import {Link, graphql} from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import SEO from '../components/seo';

const Layout = loadable(() => import('../components/layout'));
const Product = loadable(() => import('../components/shopify/Product'));

/**
 * Product template class.
 */
class ProductPage extends React.Component {
  /**
   * Renders product template object.
   * @return {object} product template object
   */
  render() {
    const shopifyProduct = get(this, 'props.data.shopifyProduct');
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = shopifyProduct.excerpt;
    const {previous, next} = this.props.pageContext;

    return (
      <>
        <SEO
          title={`${shopifyProduct.title}`}
          description={shopifyProduct.description}
          image={shopifyProduct.images[0].originalSrc} />

        <Layout location={this.props.location} title={siteTitle} shopifyCollections={this.props.shopifyCollections}>
          <ProductContainer>
            <Link
              to="/shop"
              style={{
                display: 'flex',
                marginBottom: '20px',
                textTransform: 'lowercase',
                zIndex: '12',
                width: 'fit-content',
              }}>
              ← back to shop
            </Link>
            <p>
            </p>

            <ProductInformation>
              <Product product={shopifyProduct} soldOut={!shopifyProduct.availableForSale}/>
            </ProductInformation>

            <ul
              style={{
                marginTop: '45px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
                textTransform: 'lowercase',
              }}
            >
              <li>
                {
                  previous &&
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                }
              </li>
              <li>
                {
                  next &&
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                }
              </li>
            </ul>
          </ProductContainer>
        </Layout>
      </>
    );
  }
}

export default ProductPage;

export const query = graphql`
  query($handle: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
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
`;

const ProductContainer = styled.div`
  padding: 45px 5vh
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-evenly;
`;

const ProductOverview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  width: 400px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ProductDescription = styled.div`
  text-transform: lowercase;
  margin-left: 30px;
  text-align: left;

  @media (max-width: 700px) {
    margin: 20px 0;
  }
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

const Img = styled(Image)`
  position: relative;
  width: 400px;
  min-width: 400px;

  @media (max-width: 700px) {
    width: 80vw;
    min-width: 80vw;
  }
`;
