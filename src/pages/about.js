import React from 'react'
import { Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'

const SecondPage = props => (
  <Layout path={props.location.pathname}>
    <BG />

    <SEO title="Page two" path={props.location.pathname} />
    <h1>About page coming soon...</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
