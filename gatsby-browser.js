/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require("react")
const Root = require("./src/components/Root").default

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {

  const fetch = require('isomorphic-fetch');
  const shopify = require('shopify-buy');

  const client = shopify.buildClient({
    domain: 'wynne-the-pooh.myshopify.com',
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
  }, fetch);

  return <Root client={client} {...props}>{element}</Root>
}
