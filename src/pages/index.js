// @flow

import React from 'react';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';

import HomeImage from '../images/home-background.jpeg';

const Layout = loadable(() => import('../components/layout'));
const Brand = loadable(() => import('../components/navbar/Brand'));

/**
 * Home class.
 */
class Home extends React.Component<Props> {

  /**
   * Renders home object.
   * @return {object} home object
   */
  render() {
    const ogImg = require('../images/home-background.jpeg');

    return (
      <Layout isHomePage>
        <main className="home">
          <Helmet htmlAttributes={{lang: 'en'}}>
            <title>wynne the pooh</title>
            <meta charSet="utf-8" />
            <meta property="og:title" content="wynne the pooh" />
            <meta property="og:url" content="https://www.wynnethepooh.com" />
            <meta property="og:image" content={HomeImage} />
          </Helmet>
          <Brand isHomePage/>

        </main>
      </Layout>

    );
  }
}

type Props = {};

export default Home;
