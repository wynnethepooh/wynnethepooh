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
    return (
      <Layout isHomePage>
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
