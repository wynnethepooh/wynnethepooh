import React from 'react';
import { Link, graphql } from "gatsby";
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import "./shop.css";

class Shop extends React.Component {
  render() {

    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const products = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout>
        <div className="shop">
          <h1>shop</h1>
          <div className="product-list">
            <Helmet
              htmlAttributes={{ lang: 'en' }}
              meta={[{ name: 'description', content: siteDescription }]}
              title={siteTitle}
            />

            {products.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug;
              var image = get(node, 'frontmatter.image');
              const imgSrc= require(`./../pages${node.frontmatter.path}${image[0].src}.jpg`);

              return (
                <div key={node.fields.slug} className="product">
                  {node.frontmatter.sold &&
                    <div className="sold-out">
                      Sold out
                    </div>
                  }
                  <Link to={node.fields.slug}>
                    <img src={imgSrc} width="200px"></img>
                  </Link>
                  <div className="product-overview">
                    <h3 className="product-title">
                      <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    {node.frontmatter.sold &&
                      <strike>
                        <h3 className="product-price" dangerouslySetInnerHTML={{ __html: '&dollar;' + node.frontmatter.price }} />
                      </strike>
                    }
                    {!node.frontmatter.sold &&
                      <h3 className="product-price" dangerouslySetInnerHTML={{ __html: '&dollar;' + node.frontmatter.price }} />
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Layout>

    );
  }
}

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
`
