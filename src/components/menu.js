import React, { useState, useCallback } from 'react'

import styled from 'styled-components'

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
  color: ${({ theme }) => theme.textColor};


  /* padding-right: 2rem; */
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
    color: ${({ theme }) => theme.colors.grey7};
    @media (max-width: 960px) {
      color: ${({ theme }) => theme.textColor};
    }
  }
  :focus {
    outline: none;
    /* color: ${({ theme }) => theme.colors.link}; */
    @media (max-width: 960px) {
      color: ${({ theme }) => theme.textColor};
    }
  }
`

const MenuFlyout = styled.nav`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2.2rem;
  left: -1rem;
  min-width: 256px;
  width: 100%;
  width: fit-content;
  border-radius: 8px;
  height: 0;
  width: 0;
  overflow: hidden;
  z-index: -2;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);
  z-index: 999;
  backdrop-filter: blur(120px);
  background-color: ${({ theme }) => theme.menuBG};

  p {
    padding: 0px;
  }

  @media (max-width: 960px) {
    font-size: 1.125rem;
    position: initial;
    box-shadow: none;
    top: unset;
    left: unset;
    padding: 0;
    margin-top: 1rem;
    backdrop-filter: 'none';
    background-color: rgba(255, 255, 255, 0);
    width: auto;
    height: auto;
  }
`

const StyledMenuTitle = styled.span`
  text-decoration: none;
  margin: 0px;
  border-radius: 0.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  width: fit-content;
  font-size: 1.15rem;
  padding: 0 0 0.2rem;
  :focus {
    outline: 0;
  }
  a:focus {
    opacity: 0.5;
  }

  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.grey7};
  }

  :hover nav,
  &:focus-within nav,
  nav:hover {
    width: auto;
    height: auto;
    max-height: 1500px;
    padding: 1rem;
    opacity: 1;
    transition: max-height 0.4s 3s;
  }

  @media (max-width: 960px) {
    margin-bottom: 1rem;
    user-select: none;
    :hover nav,
    &:focus-within nav,
    nav:hover {
      padding: 0;
    }
  }
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
`

const StyledMenuItem = styled.span`
  text-decoration: none;
  margin: 0px;
  border-radius: 0.5rem;
  width: fit-content;
  padding: 0;

  :hover {
    color: ${({ theme }) => theme.colors.grey7};
    border-radius: 8px;
  }
  @media (max-width: 960px) {
  }
`

const StyledExternalLink = styled.a`
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: block;
  margin: 0.25rem 0;
  width: 100%;
  cursor: pointer;
  :focus {
    outline: 0;
    opacity: 0.9;
  }
  :hover {
    * {
      color: ${({ theme }) => theme.colors.grey5};
    }
  }
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
  width: fit-content;
  @media (max-width: 960px) {
    padding: 0;
  }
`

const StyledDescription = styled.p`
  font-size: 0.825rem;
  margin: 0;
  padding: 0;
  padding: 0px 0.5rem 0.25rem 0.5rem;
  width: fit-content;
  color: ${({ theme }) => theme.colors.grey6};
  @media (max-width: 960px) {
    padding: 0;
  }
`

export default function Menu(props) {
  return (
    <StyledMenu tabIndex={0}>
      <StyledMenuTitle>
        <span style={{ marginRight: '0.25rem' }}>{props.data.name} </span>
        <MenuFlyout>
          {props.data.sublinks.map((item, index) => {
            return (
              <StyledMenuItem tabindex={index} key={index}>
                {item.link.split('.').slice(-1)[0] === 'pdf' ? (
                  <StyledExternalLink href={item.link} target="_blank" rel="noopener noreferrer">
                    <StyledTitle>{item.name}</StyledTitle>
                  </StyledExternalLink>
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
      </StyledMenuTitle>
    </StyledMenu>
  )
}
