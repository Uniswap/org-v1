import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import GithubIcon from '../../images/githubicon.inline.svg'

const StyledInfo = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  padding: 1rem;
  /* background-color: ${({ theme }) => theme.colors.grey1}; */
  background-color: #FFF4D2;
  color: #5a3800;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-weight: 350;
  a {
    color: #5a3800;
  }
`
const StyledGithubIcon = styled(GithubIcon)`
  width: 16px;
  margin-right: 6px;
  path {
    fill: ${({ theme }) => theme.colors.grey9};
  }

  :before {
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 1px;

    content: ' ';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.grey9};
    opacity: 0.2;
  }
`

const Github = ({ children, link }) => (
  <StyledInfo to={link}>
    <StyledGithubIcon />
    {children}
  </StyledInfo>
)

export default Github
