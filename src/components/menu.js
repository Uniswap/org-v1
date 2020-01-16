import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'gatsby'

import styled from 'styled-components'

export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => setState(state => !state), [])

  return [state, toggle]
}

const StyledMenu = styled.button`
  padding: 0.5rem 2rem;
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
`

const StyledMenuItem = styled.li`
  text-decoration: none;
  /* padding: 0.15rem 0.5rem; */
  margin: 0px;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
`

const MenuFlyout = styled.span`
  font-size: 1.125rem;
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3rem;
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.04);
`

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ active }) => active && 600};
  border-radius: 8px;
  text-decoration: none;
  color: black;
  padding: 0.25rem 0.5rem;
  padding-right: 2rem;

  color: ${({ theme }) => theme.colors.grey9};
  :hover {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.grey1};
  }
`

export default function Menu(props) {
  const node = useRef()
  const [isOpen, updateIsOpen] = useState(false)

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

    if (isOpen) {
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
  }, [isOpen, updateIsOpen])

  return (
    <StyledMenu ref={node}>
      <StyledMenuItem
        onMouseOver={() => updateIsOpen(true)}
        onFocus={() => updateIsOpen(true)}
        isOpen={isOpen}
      >
        {props.data.name}
      </StyledMenuItem>
      {isOpen ? (
        <MenuFlyout>
          {props.data.sublinks.map(item => {
            return (
              <StyledMenuItem key={item.name}>
                <StyledLink to={item.link}>{item.name}</StyledLink>
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
