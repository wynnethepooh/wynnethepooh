// @flow

import React from 'react';
import Layout from '../components/layout';

/**
 * 404 class
 */
class NotFoundPage extends React.Component<Props> {
  /**
   * Renders 404 page.
   * @return {object} 404 page
   */
  render() {
    const fetch = require('isomorphic-fetch');
    const shopify = require('shopify-buy');

    const client = shopify.buildClient({
      domain: 'wynne-the-pooh.myshopify.com',
      storefrontAccessToken: '1e5568ef2b02e41e3e1a1755f1af254a',
    }, fetch);

    return (
      <Layout location={this.props.location} client={client}>
        <div className="page">
          <h1>Not Found</h1>
          <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
        </div>
      </Layout>
    );
  }
}

type Props = {
  location: any
};

export default NotFoundPage;
