import React from 'react'
import Layout from '../components/layout'

const DocsLayout = ({ children }) => {
  return (
    <Layout>
      <div
        style={{
          // Layout styling
          margin: `10%`,
          backgroundColor: `#fafafa`
        }}
      >
        {children}
      </div>
    </Layout>
  )
}

export default DocsLayout
