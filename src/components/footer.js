import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Dropdown(props) {
  const items = props.links.map(node => {
    const title = node.name
    return (
      <li>
        <Link key={node.name} to={node.link}>
          {title}
        </Link>
      </li>
    )
  })
  return <ul>{items}</ul>
}

const Footer = props => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          menulinks {
            name
            sublinks {
              description
              name
              link
            }
          }
          title
        }
      }
    }
  `)

  return (
    <footer
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          {data.title}
        </Link>
        {data.site.siteMetadata.menulinks.map(item => {
          return (
            <>
              <p>{item.name}</p>
              <Dropdown links={item.sublinks} />
            </>
          )
        })}
      </div>
    </footer>
  )
}
export default Footer
