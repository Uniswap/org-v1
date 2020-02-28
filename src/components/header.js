import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Menu from './menu'

import Uni from '../images/uni.inline.svg'
import Wordmark from '../images/wordmark.inline.svg'
import MenuIcon from '../images/menu.inline.svg'
import CloseIcon from '../images/x.inline.svg'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 0px;
  width: 100%;
  font-size: 1.125rem;
  z-index: 999;
  font-weight: 500;
  @media (max-width: 960px) {
    padding: 1rem 0px;
    flex-direction: column;
    justify-content: center;
  }
`

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: right 0.25s ease;
  @media (max-width: 960px) {
    position: fixed;
    top: 0px;
    right: ${({ open }) => (open ? '0px' : '-375px')};
    flex-direction: column;
    align-items: flex-start;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.grey1};
    z-index: 9998;
    width: 100%;
    max-width: 375px;
    padding: 2rem;
    overflow: scroll;
    box-shadow: ${({ theme }) => theme.shadows.huge};
  }
`

const StyledNavTitleWrapper = styled.nav`
  display: flex;
  align-items: center;
`

const StyledNavTitle = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textColor};
  margin-left: 0.25rem;
  margin-top: 2px;
  z-index: 999;
  vertical-align: bottom;
`

const StyledTradeLink = styled.a`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  color: ${({ theme }) => theme.invertedTextColor};
  border-radius: 12px;
  margin-left: 1.5rem;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;

  :hover {
    transform: scale(1);
  }
  @media (max-width: 960px) {
    display: none;
  }
`

const StyledHomeLink = styled(Link)`
  max-height: 48px;
  display: flex;
  align-items: center;
`

const MenuToggle = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.link};
  position: absolute;
  right: 0px;
  display: none;
  z-index: 9999;
  width: 24px;
  height: 24px;
  padding: 0px;
  :focus {
    outline: none;
  }
  @media (max-width: 960px) {
    display: inline-block;
  }
`

const StyledNavMenuImage = styled.img`
  margin: 0;
`

const StyledUni = styled(Uni)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin: 0;
  width: 24px;
  margin-right: 0.5rem;
  transform: rotate(0deg);
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
`

const StyledWordmark = styled(Wordmark)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin: 0;
  margin-top: 4px;
`

const StyledCloseIcon = styled(CloseIcon)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const Header = props => {
  const matches = useMediaQuery('only screen and (max-width: 960px)')
  const node = useRef()
  const button = useRef()
  const [isMenuOpen, updateIsMenuOpen] = useState(false)

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

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        node.current.contains(e.target) ||
        button.current.contains(e.target)
      ) {
        return
      }
      updateIsMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, updateIsMenuOpen, matches])

  return (
    <StyledHeader>
      <StyledNavTitleWrapper>
        <StyledHomeLink
          to="/"
          style={{
            textDecoration: `none`
          }}
        >
          <StyledUni />
          <StyledWordmark />
        </StyledHomeLink>
        {props.path && props.path !== '/' && props.path !== '' && (
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
      <MenuToggle ref={button} onClick={e => updateIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <StyledCloseIcon /> : <StyledMenuIcon />}
      </MenuToggle>
      <StyledNav ref={node} open={isMenuOpen}>
        {data.site.siteMetadata.menulinks
          .filter(item => {
            return item.name !== 'Community'
          })
          .map(item => {
            return <Menu key={item.name} data={item} />
          })}
        {props.path !== undefined && (
          <StyledTradeLink href="https://uniswap.exchange/">
            Trade tokens
          </StyledTradeLink>
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
