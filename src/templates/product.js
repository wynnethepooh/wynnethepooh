import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import BuyProduct from '../components/BuyProduct'
import Layout from '../components/layout'
import styled from 'styled-components';

class ProductTemplate extends React.Component {
  render() {
    const product = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = product.excerpt
    const { previous, next } = this.props.pageContext
    const images = product.frontmatter.image
      .map(x => ({
        name: x.name,
        src: require(`./../pages${product.frontmatter.path}${x.src}.jpg`)
      }))

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <ProductPage>

          <Link
            to="/shop"
            style={{
              display: "flex",
              marginBottom: "20px",
              textTransform: "lowercase"
            }}>
            ← back to shop
          </Link>

          <Helmet
            htmlAttributes={{ lang: 'en' }}
            meta={[{ name: 'description', content: siteDescription }]}
            title={`${product.frontmatter.title} | ${siteTitle}`}/>
          <h1>{product.frontmatter.title}</h1>
          <p>
          </p>

          <ProductInformation>
            {!product.frontmatter.sold &&
              <BuyProduct product={product.frontmatter} images={images}>
              </BuyProduct>
            }

            {product.frontmatter.sold &&
              <ProductOverview>
                <DisplayBlock>
                  <ProductBanner>
                      Sold out
                  </ProductBanner>
                  <ProductImage src={require(`./../pages${product.frontmatter.path}default.jpg`)}/>
                </DisplayBlock>
                <ProductDescription>
                  <div dangerouslySetInnerHTML={{ __html: product.frontmatter.description }} />

                  <Dimensions>
                    <DimensionsHeader>Dimensions</DimensionsHeader>
                    {product.frontmatter.dimensions.map(dimension => {
                      return (
                        <div key={dimension} dangerouslySetInnerHTML={{ __html: "- " + dimension}} />
                      )
                    })}
                    <div>- Each piece is handmade so sizes may vary</div>
                  </Dimensions>
                </ProductDescription>
              </ProductOverview>
            }
          </ProductInformation>

          <ul
            style={{
              marginTop: "45px",
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
        </ProductPage>
      </Layout>
    )
  }
}

export default ProductTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        price
        sold
        id
        path
        description
        dimensions
        image {
          name
          src
        }
        customFields {
          name
          values
        }
      }
    }
  }
`

const ProductPage = styled.div`
  padding: 2.5vh 5vh
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-evenly;
`;

const ProductBanner = styled.div`
  text-transform: lowercase;
  position: absolute;
  top: 40px;
  right: -7px;
  background-color: #CC8E20;
  color: white;
  padding: 3px 7px;
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

const DisplayBlock = styled.div`
  position: relative;
  display: inline-block;
`;