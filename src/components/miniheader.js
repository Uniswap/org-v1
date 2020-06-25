import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled from 'styled-components'
// import Search from './search'

import Search from './algoliaSearch'

import Uni from '../images/uni.inline.svg'
import { Sun, Moon } from 'react-feather'

import useDarkMode from 'use-dark-mode'

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
  @media (max-width: 960px) {
    padding: 1.5rem 2rem;
    height: ${({ open }) => (open ? '100vh' : '100%')};
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

const Header = props => {
  const node = useRef()
  const darkMode = useDarkMode(false)

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

          {/* <StyledWordmark /> */}
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
      <StyledNav ref={node}>
        <Search />
        <StyledButton type="button" onClick={darkMode.value ? darkMode.disable : darkMode.enable}>
          {darkMode.value ? <Sun size={20} /> : <Moon size={20} />}
        </StyledButton>
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
