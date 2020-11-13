// @flow

import React from 'react';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';

const Layout = loadable(() => import('../components/layout'));

/**
 * Contact class.
 */
class Contact extends React.Component<Props> {
  /**
   * Renders contact object.
   * @return {object} contact object
   */
  render() {

    return (
      <Layout>
        <Helmet htmlAttributes={{lang: 'en'}}>
          <title>contact | wynne the pooh</title>
        </Helmet>
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
