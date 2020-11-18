const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
            products {
              handle
            }
          }
        }
      }
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/product/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductPage.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    });
    result.data.allShopifyCollection.edges
//      .filter(node => node.products && node.products.length > 0)
      .forEach(({ node }) => {
        createPage({
          path: `/collection/${node.handle}/`,
          component: path.resolve(`./src/templates/CollectionPage.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            handle: node.handle,
          },
        })
      })
  })
}
