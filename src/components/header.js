import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Menu from './menu'

import Uni from '../images/uni.inline.svg'
import MenuIcon from '../images/menu.inline.svg'
import CloseIcon from '../images/x.inline.svg'

import { Sun, Moon } from 'react-feather'
import { useDarkMode } from '../contexts/Application'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;
  z-index: 3;
  position: sticky;
  top: 0;
  height: 2rem;
  background-color: white;
  @media (max-width: 960px) {
    background-color: none;
    padding: 1.5rem 2rem;
    height: ${({ open }) => (open ? '100vh' : '100%')};
  }
`

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  transition: right 0.25s ease;
  @media (max-width: 960px) {
    position: fixed;
    top: 0px;
    right: ${({ open }) => (open ? '0px' : '-100%')};
    align-items: flex-start;
    flex-wrap: wrap;
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) => theme.colors.grey1};
    width: 100%;
    height: 100%;
    z-index: 999;
    padding: 2rem;
    overflow: scroll;
    box-shadow: ${({ theme }) => theme.shadows.huge};
  }
`

const StyledNavTitleWrapper = styled.nav`
  display: flex;
  align-items: center;
`

const StyledTradeLink = styled.a`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  color: ${({ theme }) => theme.invertedTextColor};
  border-radius: 8px;
  display: inline-block;
  transition: transform 0.25s ease;
  font-weight: 400;
  font-family: 'GT Haptik Regular';

  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

  :hover {
    transform: translate3d(2px, 2px, 10px);
  }

  @media (max-width: 960px) {
    display: none;
  }
`

const StyledButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  color: ${({ theme }) => theme.textColor};
  :focus {
    outline: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
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
  color: ${({ theme }) => theme.colors.grey9};
  display: none;
  z-index: 9999;
  width: 24px;
  height: 24px;
  padding: 0px;

  :focus {
    outline: none;
  }
  @media (max-width: 960px) {
    display: initial;
    position: ${({ open }) => (open ? 'fixed' : 'relative')};
    right: ${({ open }) => (open ? '1.5rem' : 'initial')};
    top: ${({ open }) => (open ? '1.5rem' : 'initial')};
  }
`

const StyledUni = styled(Uni)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin: 0;
  width: 28px;
  height: 28px;
  margin-right: 0.35rem;
  margin-top: -4px;
  transform: rotate(0deg);
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
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

const HideSmall = styled.span`
  @media (max-width: 960px) {
    display: none;
  }
`

const Header = props => {
  const matches = useMediaQuery('only screen and (max-width: 1024px)')
  const node = useRef()
  const button = useRef()
  const [isMenuOpen, updateIsMenuOpen] = useState(false)
  const [darkMode, toggleDarkMode] = useDarkMode()

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

  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.maxHeight = '-webkit-fill-available'
    }
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle)
  }, [isMenuOpen]) // Empty array ensures effect is only run on mount and unmount

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current.contains(e.target) || button.current.contains(e.target)) {
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
    <StyledHeader open={isMenuOpen}>
      <StyledNavTitleWrapper>
        <StyledHomeLink
          to="/"
          style={{
            textDecoration: `none`
          }}
        >
          <StyledUni />
        </StyledHomeLink>
      </StyledNavTitleWrapper>
      <MenuToggle ref={button} open={isMenuOpen} onClick={() => updateIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <StyledCloseIcon /> : <StyledMenuIcon />}
      </MenuToggle>
      <StyledNav ref={node} open={isMenuOpen}>
        {data.site.siteMetadata.menulinks.map(item => {
          return <Menu key={item.name} data={item} />
        })}
        <HideSmall>
          <StyledButton type="button" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </StyledButton>
        </HideSmall>

        {props.path !== undefined && <StyledTradeLink href="https://app.uniswap.org/">Launch App ↗</StyledTradeLink>}
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
