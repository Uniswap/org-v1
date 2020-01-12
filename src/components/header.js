import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import uni from '../images/uni.svg'

function Dropdown(props) {
  const items = props.links.map(node => {
    const title = node.name
    return (
      <li key={node.name}>
        <Link to={node.link}>{title}</Link>
      </li>
    )
  })
  return <ul>{items}</ul>
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;
  font-size: 1.25rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
`

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`

const StyledNavElement = styled.div`
  margin-left: 1.5rem;
`

const StyledNavImage = styled.img`
  margin: 0;
  width: 160px;
`

const StyledTradeLink = styled.a`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.pink1};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 100px;
  margin-left: 1.5rem;
  max-height: 48px;
`

const Header = props => {
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
    <StyledHeader>
      <Link
        to="/"
        style={{
          textDecoration: `none`
        }}
      >
        <StyledNavImage src={uni} alt="uni logo" />
      </Link>
      <StyledNav>
        {data.site.siteMetadata.menulinks.map(item => {
          return (
            <StyledNavElement key={item.name}>
              <>{item.name}</>
              {/* <Dropdown links={item.sublinks} /> */}
            </StyledNavElement>
          )
        })}
        <StyledTradeLink>Trade Tokens</StyledTradeLink>
      </StyledNav>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
