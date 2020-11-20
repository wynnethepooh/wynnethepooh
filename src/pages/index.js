// @flow

import React from 'react';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';

import SEO from '../components/seo';

const Layout = loadable(() => import('../components/layout'));
const Brand = loadable(() => import('../components/navbar/Brand'));
const BackgroundTheme = loadable(() => import('../components/BackgroundTheme'));

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
      <>
        <SEO
          title="home"
          keywords={[`ceramics`, `pot`, `pottery`]} />
        <Layout isHomePage shopifyCollections={this.props.shopifyCollections}>
          <BackgroundTheme isHomePage />
          <main className="home">
            <Helmet htmlAttributes={{lang: 'en'}}>
              <meta charSet="utf-8" />
            </Helmet>
            <Brand isHomePage/>

          </main>
        </Layout>
      </>
    );
  }
}

type Props = {};

export default Home;
