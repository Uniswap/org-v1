import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Menu from './menu'

import uni from '../images/uni.svg'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4rem;
  font-size: 1.125rem;
  margin-bottom: 3rem;
`

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`

const StyledNavTitle = styled.span`
  font-weight: 700;
  color: black;
`

const StyledNavImage = styled.img`
  margin: 0;
  width: 24px;
  margin-right: 0.5rem;
`

const StyledTradeLink = styled.a`
  padding: 0.5rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.pink1};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 100px;
  margin-left: 1.5rem;
  max-height: 48px;
`

const StyledHomeLink = styled(Link)`
  max-height: 48px;
  display: flex;
  align-items: center;
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
      <StyledHomeLink
        to="/"
        style={{
          textDecoration: `none`
        }}
      >
        <StyledNavImage src={uni} alt="uni logo" />{' '}
        <StyledNavTitle>Uniswap</StyledNavTitle>
      </StyledHomeLink>
      <StyledNav>
        {data.site.siteMetadata.menulinks
          .filter(item => {
            return item.name !== 'Community'
          })
          .map(item => {
            return <Menu key={item.name} data={item} />
          })}
        <StyledTradeLink>Swap Tokens</StyledTradeLink>
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
