// @flow

import React from 'react';
import {Helmet} from 'react-helmet';

import Layout from '../components/layout';
import Brand from '../components/navbar/Brand';

/**
 * Home class.
 */
class Home extends React.Component<Props> {

  /**
   * Renders home object.
   * @return {object} home object
   */
  render() {
    const fetch = require('isomorphic-fetch');
    const shopify = require('shopify-buy');

    const client = shopify.buildClient({
      domain: 'wynne-the-pooh.myshopify.com',
      storefrontAccessToken: '1e5568ef2b02e41e3e1a1755f1af254a',
    }, fetch);

    return (
      <Layout isHomePage client={client}>
        <main className="home">
          <Helmet htmlAttributes={{lang: 'en'}}>
            <title>wynne the pooh</title>
            <meta charSet="utf-8" />
          </Helmet>
          <Brand isHomePage/>

        </main>
      </Layout>

    );
  }
}

type Props = {};

export default Home;
