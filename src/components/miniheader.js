import React, { useRef, useState } from 'react'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Search from './algoliaSearch'
import Uni from '../images/uni.inline.svg'
import { Sun, Moon, Home } from 'react-feather'

import MenuIcon from '../images/menu.inline.svg'
import CloseIcon from '../images/x.inline.svg'
import Discord from '../images/discord.inline.svg'
import Github from '../images/githubicon.inline.svg'

import SidebarV2 from './sidebarV2'
import SidebarV1 from './sidebarV1'
import { useMediaQuery } from '@react-hook/media-query'

import { useDarkMode } from '../contexts/Application'

const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  left: 0px;
  padding: 1rem 1.25rem;
  width: 100%;
  z-index: 3;
  height: 65px;
  max-width: 100vw;
  min-width: 100vw;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 1.5rem 2rem;
    height: ${({ open }) => (open ? '100vh' : '125px;')};
  }
`
const StyledButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.colors.textColor};
  :focus {
    outline: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
  a {
    height: 24px;
    color: ${({ theme }) => theme.textColor};
  }
  svg path {
    fill: ${({ theme, fill }) => fill && theme.textColor};
    stroke: ${({ theme }) => theme.textColor};
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
    right: ${({ open }) => (open ? '0px' : '-100%')};
    align-items: flex-start;
    flex-wrap: wrap;
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) => theme.colors.grey1};
    width: 100%;
    height: 100%;
    z-index: 999;
    padding: 2rem;
    overflow: auto;
    box-shadow: ${({ theme }) => theme.shadows.huge};
  }
`

const StyledNavTitleWrapper = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const StyledNavTitle = styled(Link)`
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.textColor};
  margin-left: 0.35rem;
  margin-bottom: 0.15rem;
  z-index: 999;
  text-decoration: none;
  vertical-align: bottom;
  font-weight: 500;
  white-space: pre;

  :hover {
    opacity: 1;
  }
`

const StyledHomeLink = styled(Link)`
  max-height: 48px;
  display: flex;
  align-items: center;
`

const StyledUni = styled(Uni)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin: 0;
  width: 20px;
  height: 20px;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
const MobileSearchWrapper = styled.div`
  display: none;
  @media (max-width: 960px) {
    display: initial;
    margin-top: 20px;
    width: 100%;
  }
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

const VersionLabel = styled.span`
  padding: 0.15rem 0.45rem;
  border-radius: 12px;
  background: ${({ theme, toggled }) => (toggled ? theme.textColor : 'none')};
  color: ${({ theme, toggled }) => (toggled ? theme.invertedTextColor : theme.textColor)};

  font-size: 0.75rem;
  font-weight: 400;
`

const VersionToggle = styled(Link)`
  border-radius: 14px;
  margin-right: 1rem;
  color: ${({ theme }) => theme.invertedTextColor};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  display: flex;
  width: fit-content;
  cursor: pointer;
`

const Header = props => {
  const node = useRef()
  const [darkMode, toggleDarkMode] = useDarkMode()

  // get global version and check if v2 or not
  const v2Toggle = props.path.slice(0, 8) === '/docs/v2'

  const button = useRef()
  const [isMenuOpen, updateIsMenuOpen] = useState(false)

  const isMobile = useMediaQuery('(max-width: 960px)')

  return (
    <StyledHeader open={isMenuOpen}>
      <Row>
        <StyledNavTitleWrapper>
          <StyledHomeLink
            to="/"
            style={{
              textDecoration: `none`
            }}
          >
            <StyledUni />
          </StyledHomeLink>
          {props.path && props.path !== '/' && props.path !== '' && (
            <>
              <StyledNavTitle to={'/' + props.path.split('/')[1]}>
                {props.path.length > 20 ? 'Docs /' : 'Uniswap Docs /'}
              </StyledNavTitle>
              <StyledNavTitle to={'/docs/' + props.path.split('/')[2]}>
                {props.path.split('/')[2].replace(/(^|\s)\S/g, function(t) {
                  return t.toUpperCase()
                })}
              </StyledNavTitle>
              <StyledNavTitle to={'/docs/' + props.path.split('/')[2] + '/' + props.path.split('/')[3]}>
                {props.path.split('/')[3] &&
                  '/ ' +
                    props.path
                      .split('/')[3]
                      .replace(/\d+-/g, '')
                      .replace(/-/g, ' ')
                      .replace(/(^|\s)\S/g, function(t) {
                        return t.toUpperCase()
                      })}
              </StyledNavTitle>{' '}
            </>
          )}
        </StyledNavTitleWrapper>
        <MenuToggle ref={button} open={isMenuOpen} onClick={() => updateIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <StyledCloseIcon /> : <StyledMenuIcon />}
        </MenuToggle>
        <StyledNav ref={node} open={isMenuOpen}>
          {!isMobile && <Search {...props} />}
          {isMobile &&
            (v2Toggle ? <SidebarV2 parent={'/docs/'} {...props} /> : <SidebarV1 parent={'/docs/'} {...props} />)}
          <VersionToggle to={v2Toggle ? '/docs/v1/' : '/docs/v2/'}>
            <VersionLabel toggled={!v2Toggle}>V1</VersionLabel>
            <VersionLabel toggled={v2Toggle}>V2</VersionLabel>
          </VersionToggle>
          <StyledButton type="button" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </StyledButton>
          <StyledButton fill>
            <a href="https://discord.gg/FCfyBSbCU5">
              <Discord />
            </a>
          </StyledButton>
          <StyledButton fill>
            <a href="https://github.com/Uniswap">
              <Github width={20} />
            </a>
          </StyledButton>
          <StyledButton type="button">
            <Link to="/">
              <Home size={20} />{' '}
            </Link>
          </StyledButton>
        </StyledNav>
      </Row>
      <MobileSearchWrapper>
        <Search {...props} />
      </MobileSearchWrapper>
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
