import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import Collapsible from 'react-collapsible'

import { useStaticQuery, graphql } from 'gatsby'
import './sidebar.css'

const StyledSidebar = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: -webkit-sticky;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  color: #2172e5;
  padding-left: 4rem;
  font-size: 1.125rem;
`

const StyledSection = styled(Collapsible)`
  /* margin-bottom: 1.25rem; */

  .Collapsible__trigger {
    cursor: pointer;
  }
`

const StyledLink = styled(Link)`
  font-weight: ${({ active }) => active && 600};
  background-color: ${({ active }) => active && '#F7F8FA'};
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  margin: 0;
  color: #2172e5;
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const StyledLisItem = styled.li`
  margin-left: 1rem;
`

const StyledHeader = styled.h2`
  color: black;
  margin-bottom: 3rem;
  /* padding-bottom: 1rem; */
`

function List(props) {
  const items = props.data.docs.edges.map(({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    if (node.fields.topLevelDir === props.parent) {
      return (
        <StyledLisItem key={node.id}>
          <StyledLink
            onClick={() => scrollTo('#docs-header')}
            active={props.path === `/docs` + node.fields.slug}
            to={`/docs/` + node.fields.slug}
          >
            {title}
          </StyledLink>
        </StyledLisItem>
      )
    }
  })
  return <StyledList>{items}</StyledList>
}

const SideBar = props => {
  const data = useStaticQuery(graphql`
    query {
      topNav: allDirectory(
        filter: {
          sourceInstanceName: { eq: "docs" }
          relativeDirectory: { eq: "" }
        }
        sort: { fields: name, order: ASC }
      ) {
        edges {
          node {
            name
            id
            relativePath
          }
        }
      }
      docs: allMdx(
        filter: { fileAbsolutePath: { regex: "/docs/" } }
        sort: { order: ASC, fields: fields___slug }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
              subDir
              topLevelDir
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  return (
    <StyledSidebar>
      <StyledHeader>{'Documentation'}</StyledHeader>
      {data.topNav.edges.map(({ node }) => {
        const title = node.name
          .replace('(?m)^[\\d-]*\\s*', '')
          .replace(/-/g, ' ')
          .replace(/(^|\s)\S/g, function(t) {
            return t.toUpperCase()
          })
        const dirOpen = node.name === props.path.split('/')[2]
        return (
          <StyledSection
            key={node.id}
            trigger={title}
            transitionTime={250}
            open={dirOpen}
            easing="ease"
          >
            <List data={data} parent={node.name} path={props.path} />
          </StyledSection>
          // <StyledSection key={node.id}>
          //   <StyledSectionHeader>{title}</StyledSectionHeader>
          //   <List data={data} parent={node.name} path={props.path} />
          // </StyledSection>
        )
      })}
    </StyledSidebar>
  )
}

export default SideBar
