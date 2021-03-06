// @flow

import React from 'react';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';
import SEO from '../components/seo';

const Layout = loadable(() => import('../components/layout'));

/**
 * 404 class
 */
class NotFoundPage extends React.Component<Props> {
  /**
   * Renders 404 page.
   * @return {object} 404 page
   */
  render() {
    return (
      <>
        <SEO title="404" />
        <Layout location={this.props.location} shopifyCollections={this.props.shopifyCollections}>
          <Helmet htmlAttributes={{lang: 'en'}}>
            <title>wynne the pooh</title>
          </Helmet>
          <div className="page">
            <h1>Not Found</h1>
            <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
          </div>
        </Layout>
      </>
    );
  }
}

type Props = {
  location: any
};

export default NotFoundPage;
