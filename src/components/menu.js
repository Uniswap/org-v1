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
  padding: 0.5rem 1.5rem;
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
  z-index: 9999;
  background: none;
  @media (max-width: 812px) {
    font-size: 1.5rem;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    padding-bottom: 2rem;
  }
  :hover {
    color: ${({ theme }) => theme.colors.link};
  }
  :focus {
    outline: none;
    color: ${({ theme }) => theme.colors.link};
  }
`

const MenuFlyout = styled.span`
  font-size: 1.125rem;
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3rem;
  min-width: 196px;
  padding: 1rem 1rem 0.75rem 1rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  /* mix-blend-mode: overlay; */
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.04);

  @media (max-width: 812px) {
    font-size: 1rem;
    position: relative;
    box-shadow: none;
    padding: 0;
    top: 0;
    left: 0;
    backdrop-filter: 'none';
    background-color: rgba(255, 255, 255, 0);
  }
`

const StyledMenuTitle = styled.span`
  text-decoration: none;
  margin: 0px;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`

const StyledMenuItem = styled.span`
  text-decoration: none;
  margin: 0px;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  :hover {
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.link};
    p {
      color: ${({ theme }) => theme.colors.link};
    }
  }
`

const StyledLink = styled(Link)`
  margin: 0;
  padding: 0;
  text-decoration: none;
  margin-bottom: 0.5rem;
  width: 100%;
`
const StyledExternalLink = styled.a`
  margin: 0;
  padding: 0;
  text-decoration: none;
  margin-bottom: 0.5rem;
  width: 100%;
`

const StyledTitle = styled.p`
  display: block;
  font-weight: ${({ active }) => active && 600};
  border-radius: 8px;
  text-decoration: none;
  color: black;
  margin: 0;
  padding: 0;
  padding: 0.125rem 0.5rem 0px 0.5rem;
  color: ${({ theme }) => theme.colors.grey9};
  @media (max-width: 812px) {
    padding: 0;
  }
`

const StyledDescription = styled.p`
  font-size: 0.825rem;
  margin: 0;
  padding: 0;
  padding: 0px 0.5rem 0.25rem 0.5rem;
  min-width: 200px;
  color: ${({ theme }) => theme.colors.grey6};
  @media (max-width: 812px) {
    padding: 0;
  }
`

export default function Menu(props) {
  const matches = useMediaQuery('only screen and (max-width: 812px)')
  const node = useRef()
  const [isOpen, updateIsOpen] = useState(matches)

  function onFocus(focused) {
    if (focused) {
      updateIsOpen(true)
    } else {
      updateIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current.contains(e.target)) {
        return
      }
      updateIsOpen(false)
    }

    if (isOpen && !matches) {
      node.current.removeEventListener('focus', e => onFocus(false))
      document.addEventListener('mouseover', handleClickOutside)
    } else {
      node.current.addEventListener('focus', e => onFocus(true))
      document.removeEventListener('mouseover', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mouseover', handleClickOutside)
      node.current.removeEventListener('focus', e => onFocus(false))
    }
  }, [isOpen, updateIsOpen, matches])

  return (
    <StyledMenu ref={node}>
      <StyledMenuTitle
        onMouseOver={() => updateIsOpen(true)}
        onFocus={() => updateIsOpen(true)}
        isOpen={isOpen}
      >
        {props.data.name} {!matches && <DropdownArrow />}
      </StyledMenuTitle>
      {isOpen ? (
        <MenuFlyout>
          {props.data.sublinks.map(item => {
            return (
              <StyledMenuItem key={item.name}>
                {item.link.split('/')[0] === '' ? (
                  <StyledLink to={item.link}>
                    <StyledTitle>{item.name}</StyledTitle>
                    {item.description && (
                      <StyledDescription>{item.description}</StyledDescription>
                    )}
                  </StyledLink>
                ) : (
                  <StyledExternalLink href={item.link}>
                    <StyledTitle>{item.name}</StyledTitle>
                    {item.description && (
                      <StyledDescription>{item.description}</StyledDescription>
                    )}
                  </StyledExternalLink>
                )}
              </StyledMenuItem>
            )
          })}
        </MenuFlyout>
      ) : (
        ''
      )}
    </StyledMenu>
  )
}
