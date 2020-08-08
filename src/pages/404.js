import React from 'react'

import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'

const NotFoundPage = props => (
  <Layout path={props.location.pathname}>
    <BG />
    <SEO title="404: Not found" path={props.location.pathname} />
    <div style={{maxWidth: 1440, padding: 32,margin: 'auto'}}>
      <h1>Missing Unicorn 🦄</h1>
      <p>You just found a page that doesn&#39;t exist.</p>
    </div>
  </Layout>
)

export default NotFoundPage
