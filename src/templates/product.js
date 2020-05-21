import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import BuyProduct from '../components/BuyProduct'
import Layout from '../components/layout'
import './product.css'

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
        <div className="product-page">

          <Link to="/shop" className="back-button">
            ← back to shop
          </Link>

          <Helmet
            htmlAttributes={{ lang: 'en' }}
            meta={[{ name: 'description', content: siteDescription }]}
            title={`${product.frontmatter.title} | ${siteTitle}`}/>
          <h1>{product.frontmatter.title}</h1>
          <p>
          </p>

          <div className="product-information">
            {!product.frontmatter.sold &&
              <BuyProduct product={product.frontmatter} images={images}>
              </BuyProduct>
            }

            {product.frontmatter.sold &&
              <div className="product-overview">
                <div className="position-relative">
                  <div className="sold-out-banner">
                      Sold out
                  </div>
                  <img className="product-image" src={require(`./../pages${product.frontmatter.path}default.jpg`)}/>
                </div>
                <div className="product-text">
                  <div dangerouslySetInnerHTML={{ __html: product.frontmatter.description }} />

                  <div className="dimensions">
                    <h4>Dimensions</h4>
                    {product.frontmatter.dimensions.map(dimension => {
                      return (
                        <div key={dimension} dangerouslySetInnerHTML={{ __html: "- " + dimension}} />
                      )
                    })}
                    <div>- Each piece is handmade so sizes may vary</div>
                  </div>
                </div>
              </div>
            }
          </div>

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
        </div>
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
