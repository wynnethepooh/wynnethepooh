// @flow

import React from 'react';
import Layout from '../components/layout';

/**
 * Contact class.
 */
class Contact extends React.Component<Props> {
  /**
   * Renders contact object.
   * @return {object} contact object
   */
  render() {
    const fetch = require('isomorphic-fetch');
    const shopify = require('shopify-buy');

    const client = shopify.buildClient({
      domain: 'wynne-the-pooh.myshopify.com',
      storefrontAccessToken: '1e5568ef2b02e41e3e1a1755f1af254a',
    }, fetch);

    return (
      <Layout client={client}>
        <div className="page">
          <h1>contact</h1>
          <p>
            If you&#39;re interested in my pottery or just want to say hi, send
            me an email at <a href="mailto:wynne@wynnethepooh.com">
            wynne@wynnethepooh.com</a>.
          </p>
        </div>
      </Layout>
    );
  }
}

type Props = {};

export default Contact;
