import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Menu from './menu'

import uni from '../images/uni5.svg'
import wordmark from '../images/wordmark.svg'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem 0px;
  width: 100%;
  font-size: 1.125rem;
  /* margin-bottom: 3rem; */
  z-index: 999;
  font-weight: 500;
  @media (max-width: 812px) {
    padding: 2rem 0px;
    flex-direction: column;
  }
`

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: right 0.25s ease;
  @media (max-width: 812px) {
    position: fixed;
    top: 0px;
    /* left: 0px; */
    right: ${({ open }) => (open ? '0px' : '-100vw')};
    flex-direction: column;
    align-items: flex-start;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.grey1};
    z-index: 9998;
    width: 100vw;
    padding: 2rem;
    overflow: scroll;
    box-shadow: ${({ theme }) => theme.shadows.huge};
    /* position: fixed;
    overflow-y: scroll;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
  }
`

const StyledNavTitleWrapper = styled.nav`
  display: flex;
  align-items: center;
`

const StyledNavTitle = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey6};
  margin-left: 0.25rem;
  margin-top: 2px;
  z-index: 999;
  vertical-align: bottom;
`

const StyledNavImage = styled.img`
  margin: 0;
  width: 24px;
  margin-right: 0.5rem;
  transform: rotate(0deg);
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
`

const StyledNavWordMark = styled.img`
  margin: 0;
  margin-top: 4px;
  /* width: 24px; */
`

const StyledTradeLink = styled.a`
  padding: 0.5rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  margin-left: 1.5rem;
  max-height: 48px;
`

const StyledHomeLink = styled(Link)`
  max-height: 48px;
  display: flex;
  align-items: center;
`

const MenuToggle = styled.button`
  /* max-height: 48px; */
  border: none;
  backgound-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.link};
  position: absolute;
  right: 0px;
  display: none;
  z-index: 9999;
  @media (max-width: 812px) {
    display: inline-block;
  }
`

const Header = props => {
  const [isMenuOpen, updateIsMenuOpen] = useState(false)

  // useEffect(() => {
  //   updateIsMenuOpen(!isMenuOpen)
  // }, [isMenuOpen, updateIsMenuOpen])

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
      <StyledNavTitleWrapper>
        <StyledHomeLink
          to="/"
          style={{
            textDecoration: `none`
          }}
        >
          <StyledNavImage src={uni} alt="uni logo" />{' '}
          <StyledNavWordMark src={wordmark} alt="uniswap" />{' '}
        </StyledHomeLink>
        {props.path && (
          <StyledNavTitle
            to={'/' + props.path.split('/')[1]}
            style={{
              textDecoration: `none`
            }}
          >
            / {props.path.split('/')[1]}
          </StyledNavTitle>
        )}
      </StyledNavTitleWrapper>
      <MenuToggle onClick={e => updateIsMenuOpen(!isMenuOpen)}>Menu</MenuToggle>
      <StyledNav open={isMenuOpen}>
        {data.site.siteMetadata.menulinks
          .filter(item => {
            return item.name !== 'Community'
          })
          .map(item => {
            return <Menu key={item.name} data={item} />
          })}
        {props.path !== undefined && (
          <StyledTradeLink>Swap Tokens</StyledTradeLink>
        )}
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
