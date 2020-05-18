import React from 'react';
import Layout from '../components/layout'

class Contact extends React.Component {
  render() {
    return (
      <Layout>
        <div className="page">
          <p>
          If you're interested in my pottery or just want to say hi, send me an email at <a href="mailto:wynnetran@gmail.com">wynnetran@gmail.com</a>.
          </p>
        </div>
      </Layout>
    );
  }
}
export default Contact