// @flow

import React from 'react';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';
import SEO from '../components/seo';

const Layout = loadable(() => import('../components/layout'));

/**
 * About class.
 */
class About extends React.Component<Props> {

  /**
   * Renders about object.
   * @return {object} about object
   */
  render() {

    return (
      <>
        <SEO title="about" />
        <Layout>
          <div className="page">
            <h1>about</h1>
            <p>
              I&#39;m your typical crazy plant and cat lady, but I also make pot.
            </p>

            <p>
              My name is Wynne, not to be confused with Wayne (happens more often
              than you&#39;d think). I&#39;m a software engineer (check out
              my <a href="https://drive.google.com/file/d/1Km9qMgjCN6QmK9UZbH8KUFbOqoZAZHL6/view?usp=sharing"
                rel="noreferrer" target="_blank">resume</a>), but I started learning
              pottery in 2018 at a little ceramics lab in Los Angeles
              called <a href="https://www.slab-la.com/"
                rel="noreferrer" target="_blank">Slab LA</a>.

              Since then, I&#39;ve fallen in love with creating all kinds of
              pottery, especially zigzag pots and donut vases.
            </p>

            <p>
              I had a successful sale at Slab&#39;s 2019 holiday studio sale, and since
              then I&#39;ve
              been creating pieces for friends, but I&#39;m hoping to open up an
              online shop with my quarantine pieces soon, so check back in!
            </p>

            <p>
              Until then you can message me
              at <a href="mailto:&#119;&#121;&#110;&#110;&#101;&#064;&#119;&#121;&#110;&#110;&#101;&#116;&#104;&#101;&#112;&#111;&#111;&#104;&#046;&#099;&#111;&#109;">
              &#119;&#121;&#110;&#110;&#101;&#064;&#119;&#121;&#110;&#110;&#101;&#116;&#104;&#101;&#112;&#111;&#111;&#104;&#046;&#099;&#111;&#109;</a>.
              Hoping to hear from you!
            </p>
          </div>
        </Layout>
      </>
    );
  }
}

type Props = {};

export default About;
