import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'gatsby'

import styled from 'styled-components'
import DropdownArrow from './dropdownArrow.js'

import { useMediaQuery } from '@react-hook/media-query'

export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => setState(state => !state), [])

  return [state, toggle]
}

const StyledMenu = styled.button`
  padding: 0.5rem 0rem;
  margin: 0;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
  list-style: none;
  padding-right: 2rem;
  background: none;
  @media (max-width: 960px) {
    font-size: 1.5rem;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    /* height: 100%; */
  }

  :hover {
    color: ${({ theme }) => theme.colors.link};
    @media (max-width: 960px) {
      color: ${({ theme }) => theme.textColor};
    }
  }
  :focus {
    outline: none;
    color: ${({ theme }) => theme.colors.link};
    @media (max-width: 960px) {
      color: ${({ theme }) => theme.textColor};
    }
  }
`

const MenuFlyout = styled.span`
  /* font-size: 1.125rem; */
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2.5rem;
  left: -1rem;
  min-width: 196px;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.menuBG};
  /* backdrop-filter: blur(20px); */
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);
  z-index: 4;

  p {
    padding: 0px;
  }

  @media (max-width: 960px) {
    font-size: 1rem;
    position: initial;
    box-shadow: none;
    top: unset;
    left: unset;
    padding: 0;
    margin-top: 1rem;
    backdrop-filter: 'none';
    background-color: rgba(255, 255, 255, 0);
  }
`

const StyledMenuTitle = styled.span`
  text-decoration: none;
  margin: 0px;
  border-radius: 0.5rem;
  font-weight: 400;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
  @media (max-width: 960px) {
    margin-bottom: 1rem;
    user-select: none;
  }
`

const StyledMenuItem = styled.span`
  text-decoration: none;
  margin: 0px;
  border-radius: 0.5rem;
  :hover {
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.link};
    p {
      color: ${({ theme }) => theme.colors.link};
    }
  }
  @media (max-width: 960px) {
  }
`

const StyledLink = styled(Link)`
  margin: 0;
  padding: 0;
  text-decoration: none;
  margin: 0.25rem 0;
  display: block;
  width: 100%;
  cursor: pointer;
`
const StyledExternalLink = styled.a`
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: block;
  margin: 0.25rem 0;
  width: 100%;
  cursor: pointer;
`

const StyledTitle = styled.p`
  display: block;
  font-weight: ${({ active }) => active && 500};
  border-radius: 8px;
  text-decoration: none;
  margin: 0;
  padding: 0;
  padding: 0.125rem 0.5rem 0px 0.5rem;
  color: ${({ theme }) => theme.colors.grey9};
  @media (max-width: 960px) {
    padding: 0;
  }
`

const StyledDescription = styled.p`
  font-size: 0.825rem;
  margin: 0;
  padding: 0;
  padding: 0px 0.5rem 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.grey6};
  @media (max-width: 960px) {
    padding: 0;
  }
`

const StyledDropdownArrow = styled(DropdownArrow)`
  opacity: 0.4;
`

export default function Menu(props) {
  const matches = useMediaQuery('only screen and (max-width: 960px)')
  const node = useRef()
  const [isOpen, updateIsOpen] = useState(matches)

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current.contains(e.target)) {
        return
      }
      updateIsOpen(false)
    }

    const onFocus = focused => {
      if (focused) {
        updateIsOpen(true)
      } else {
        updateIsOpen(false)
      }
    }

    if (isOpen && !matches) {
      node.current.removeEventListener('focusin', () => onFocus(false))
      node.current.removeEventListener('focusout', () => onFocus(false))
      document.addEventListener('mouseover', handleClickOutside)
    } else {
      node.current.addEventListener('focusin', () => onFocus(true))
      node.current.addEventListener('focusout', () => onFocus(false))
      document.removeEventListener('mouseover', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mouseover', handleClickOutside)
      node.current.removeEventListener('focusin', () => onFocus(false))
      node.current.removeEventListener('focusout', () => onFocus(false))
    }
  }, [isOpen, updateIsOpen, matches])

  return (
    <StyledMenu ref={node} tabIndex={0}>
      <StyledMenuTitle
        onMouseOver={() => updateIsOpen(true)}
        onFocus={() => {
          updateIsOpen(true)
        }}
        isOpen={isOpen}
      >
        <span style={{ marginRight: '0.25rem' }}>{props.data.name} </span>
        {!matches && <StyledDropdownArrow />}
        {isOpen ? (
          <MenuFlyout>
            {props.data.sublinks.map((item, index) => {
              return (
                <StyledMenuItem tabindex={index} key={index}>
                  {item.link.split('.').slice(-1)[0] === 'pdf' ? (
                    <StyledExternalLink href={item.link} target="_blank" rel="noopener noreferrer">
                      <StyledTitle>{item.name}</StyledTitle>
                      {item.description && <StyledDescription>{item.description}</StyledDescription>}
                    </StyledExternalLink>
                  ) : item.link === '/about#brand-assets' ? null : item.link.split('/')[0] === '' ? (
                    <StyledLink to={item.link}>
                      <StyledTitle>{item.name}</StyledTitle>
                      {item.description && <StyledDescription>{item.description}</StyledDescription>}
                    </StyledLink>
                  ) : (
                    <StyledExternalLink href={item.link}>
                      <StyledTitle>{item.name}</StyledTitle>
                      {item.description && <StyledDescription>{item.description}</StyledDescription>}
                    </StyledExternalLink>
                  )}
                </StyledMenuItem>
              )
            })}
          </MenuFlyout>
        ) : (
          ''
        )}
      </StyledMenuTitle>
    </StyledMenu>
  )
}
