import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import Search from './algoliaSearch'

import Uni from '../images/uni.inline.svg'
import { Sun, Moon } from 'react-feather'

import MenuIcon from '../images/menu.inline.svg'
import CloseIcon from '../images/x.inline.svg'

import useDarkMode from 'use-dark-mode'
import SideBar from './sidebarV2'
import { useMediaQuery } from '@react-hook/media-query'

const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  left: 0px;
  padding: 1rem 2rem;
  width: 100%;
  z-index: 3;
  height: 65px;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 1.5rem 2rem;
    height: ${({ open }) => (open ? '100vh' : '125px;')};
  }
`
const StyledButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.colors.link};
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
  color: ${({ theme }) => theme.colors.link};
  margin-left: 0.35rem;
  z-index: 999;
  text-decoration: none;
  vertical-align: bottom;
  font-weight: 500;

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
    fill: ${({ theme }) => theme.colors.link};
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
    stroke: ${({ theme }) => theme.colors.link};
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.colors.link};
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

const Header = props => {
  const node = useRef()
  const darkMode = useDarkMode(false)

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
              <StyledNavTitle to={'/' + props.path.split('/')[1]}>Uniswap Docs /</StyledNavTitle>
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
          {!isMobile && <Search />}
          {isMobile && <SideBar {...props} />}
          <StyledButton type="button" onClick={darkMode.value ? darkMode.disable : darkMode.enable}>
            {darkMode.value ? <Sun size={20} /> : <Moon size={20} />}
          </StyledButton>
        </StyledNav>
      </Row>
      <MobileSearchWrapper>
        <Search />
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
