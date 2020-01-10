import { Link } from 'gatsby'
import PropTypes from 'prop-types'
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
  justify-content: space-evenly;
  background-color: black;
  color: white;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const StyledFooterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  /* min-width: 200px; */
  padding-left: 5rem;
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
    color: white;
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
