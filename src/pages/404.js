import React from 'react'
import Layout from '../components/layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="page">
          <h1>Not Found</h1>
          <p>You just hit a page that doesn&#39;t exist... the sadness.</p>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage
