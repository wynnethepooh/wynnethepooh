import React from 'react';
import { Link } from "gatsby";
import logo from '../logo.svg';
import { Helmet } from 'react-helmet'

import Layout from "../components/layout"

class Home extends React.Component {
  render() {
    return (
    <Layout>
      <main className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>wynne the pooh</title>
          <link rel="canonical" href="https://wynnethepooh.com" />
        </Helmet>
      </main>
    </Layout>

    );
  }
}

export default Home;
