// @flow

import React from 'react';
import {Link, graphql} from 'gatsby';
import get from 'lodash/get';
import {Helmet} from 'react-helmet';

import Layout from '../components/layout';
import styled from 'styled-components';

/**
 * Shop class.
 */
class Shop extends React.Component<Props> {
  /**
   * Renders shop object.
   * @return {object} shop object
   */
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(
        this,
        'props.data.site.siteMetadata.description',
    );
    const products = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout>
        <ShopPage>
          <h1>shop</h1>
          <ProductList>
            <Helmet
              htmlAttributes={{lang: 'en'}}
            >
              <title>{siteTitle}</title>
              <meta name="description" content={siteDescription}/>
            </Helmet>

            {products.map(({node}) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug;
              const image = get(node, 'frontmatter.image');
              const imgSrc = require(
                  `./../pages${node.frontmatter.path}default.jpg`,
              );

              return (
                <Product key={node.fields.slug}>
                  {node.frontmatter.sold &&
                    <ProductBanner>
                      Sold out
                    </ProductBanner>
                  }
                  <Link to={node.fields.slug}>
                    <ProductImage src={imgSrc} />
                  </Link>
                  <ProductInformation>
                    <ProductTitle>
                      <Link style={{boxShadow: 'none'}} to={node.fields.slug}>
                        {title}
                      </Link>
                    </ProductTitle>
                    {node.frontmatter.sold &&
                      <strike>
                        <ProductPrice
                          dangerouslySetInnerHTML={{
                            __html: '&dollar;' + node.frontmatter.price,
                          }} />
                      </strike>
                    }
                    {!node.frontmatter.sold &&
                      <ProductPrice
                        dangerouslySetInnerHTML={{
                          __html: '&dollar;' + node.frontmatter.price,
                        }} />
                    }
                  </ProductInformation>
                </Product>
              );
            })}
          </ProductList>
        </ShopPage>
      </Layout>

    );
  }
}

type Props = {};

export default Shop;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
            image {
              name
              src
            }
            price
            sold
          }
        }
      }
    }
  }
`;

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

const Product = styled.div`
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
  background-color: #CC8E20;
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
