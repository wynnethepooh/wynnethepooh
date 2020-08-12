import React from 'react';
import {Link} from 'gatsby';
import logo from '../logo.svg';
import {Helmet} from 'react-helmet';

import Layout from '../components/layout';

class Home extends React.Component {
  render() {
    return (
      <Layout isHomePage>
        <main className="home">
          <Helmet htmlAttributes={{lang: 'en'}}>
            <title>wynne the pooh</title>
            <meta charSet="utf-8" />
          </Helmet>


        </main>
      </Layout>

    );
  }
}

export default Home;
