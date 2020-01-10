import React from 'react'
import Layout from '.'

const Guides = ({ children }) => {
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

export default Guides
