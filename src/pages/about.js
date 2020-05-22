import React from 'react'
import Layout from '../components/layout'

class About extends React.Component {
  render() {
    return (
      <Layout>
        <div className="page">
          <h1>about</h1>
          <p>
            I'm your typical crazy plant and cat lady, but I also make pot.
          </p>

          <p>
            My name is Wynne, not to be confused with Wayne (happens more often
            than you'd think). I'm a software engineer (check out
            my <a href="https://drive.google.com/file/d/1Km9qMgjCN6QmK9UZbH8KUFbOqoZAZHL6/view?usp=sharing" target="_blank">resume</a>),
            but I started learning pottery in 2018 at a little ceramics lab in Los Angeles
            called <a href="https://www.slab-la.com/" target="_blank">Slab LA</a>.

            Since then, I've fallen in love with creating all kinds of pottery,
            especially zigzag pots and donut vases.
          </p>

          <p>
            I had a successful sale at Slab's holiday studio sale, and since
            then I've
            been creating pieces for friends, but I'm hoping to open up an
            online shop with my quarantine pieces soon, so check back in!
          </p>

          <p>
            Until then you can message me
            at <a href="mailto:&#119;&#121;&#110;&#110;&#101;&#064;&#119;&#121;&#110;&#110;&#101;&#116;&#104;&#101;&#112;&#111;&#111;&#104;&#046;&#099;&#111;&#109;">&#119;&#121;&#110;&#110;&#101;&#064;&#119;&#121;&#110;&#110;&#101;&#116;&#104;&#101;&#112;&#111;&#111;&#104;&#046;&#099;&#111;&#109;</a>.
            Hoping to hear from you!
          </p>
        </div>
      </Layout>
    );
  }
}

export default About