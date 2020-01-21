import React from 'react'
import { Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import Scene from '../components/scene'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Scene />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
