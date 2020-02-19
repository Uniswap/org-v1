import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

function Dropdown(props) {
  const items = props.links.map(node => {
    const title = node.name
    return (
      <StyledFooterLink key={node.name}>
        <Link to={node.link}>{title}</Link>
      </StyledFooterLink>
    )
  })
  return <StyledFooterLinkSection>{items}</StyledFooterLinkSection>
}

const StyledFooter = styled.footer`
  padding: 4rem 2rem;
  /* margin-bottom: 2rem; */
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  /* background-color: ${({ theme }) => theme.colors.grey9}; */
  color: ${({ theme }) => theme.colors.grey9};
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 2rem;
  }
`

const StyledFooterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding-left: 5rem;
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) {
    padding-left: 0rem;
    margin-bottom: 2rem;
  }
`

const StyledFooterLinkSection = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
`

const StyledFooterLink = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-decoration: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.grey9};
  }
`

const Footer = props => {
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

  return (
    <StyledFooter>
      <StyledSection>
        <h4>{'Stay up to date!'}</h4>
      </StyledSection>
      <StyledSection>
        {data.site.siteMetadata.menulinks.map(item => {
          return (
            <StyledFooterSection key={item.name}>
              <h4>{item.name}</h4>
              <Dropdown links={item.sublinks} />
            </StyledFooterSection>
          )
        })}
      </StyledSection>
    </StyledFooter>
  )
}
export default Footer
