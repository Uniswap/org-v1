import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { useStaticQuery, graphql } from "gatsby"

const StyledSidebar = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1rem;
  margin-right: 5rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  align-self: flex-start;
`

const StyledSection = styled.section`
  margin-bottom: 0.5rem;
`

const StyledSectionHeader = styled.p`
  font-weight: 500;
  margin-bottom: 0.5rem !important;
`

const StyledLink = styled(Link)`
  padding: 0.25rem;
  text-decoration: none;
  margin: 0;
  padding: 0;
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const StyledLisItem = styled.li`
  margin-left: 1rem;
`

const StyledHeader = styled.h3``

function List(props) {
  const items = props.data.docs.edges.map(({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    if (node.fields.topLevelDir === props.parent) {
      return (
        <StyledLisItem>
          <StyledLink key={node.id} to={`/docs/` + node.fields.slug}>
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
        sort: { fields: name, order: DESC }
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
        sort: { fields: frontmatter___index, order: DESC }
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
      <StyledHeader>{"Documentation"}</StyledHeader>
      {data.topNav.edges.map(({ node }) => {
        const title = node.name
          .replace(/-/g, " ")
          .replace(/(^|\s)\S/g, function(t) {
            return t.toUpperCase()
          })
        return (
          <StyledSection>
            <StyledSectionHeader key={node.id}>{title}</StyledSectionHeader>
            <List data={data} parent={node.name} />
          </StyledSection>
        )
      })}
    </StyledSidebar>
  )
}

export default SideBar
