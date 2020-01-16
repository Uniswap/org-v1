import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import Collapsible from 'react-collapsible'
import Search from '../components/search'

import { useStaticQuery, graphql } from 'gatsby'
import '../styles/sidebar.css'

const StyledSidebar = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: -webkit-sticky;
  position: sticky;
  top: 5rem;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.link};
  padding: 0 4rem;
  min-width: 256px;
  /* font-size: 1.125rem; */
`

const StyledSection = styled(Collapsible)`
  /* opacity: ${({ open }) => (open ? 1 : 0.6)}; */
`

const StyledLink = styled(Link)`
  font-weight: ${({ active }) => active && 600};
  background-color: ${({ active }) => active && '#F7F8FA'};
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  margin: 0;
  /* opacity: ${({ active }) => (active ? 1 : 0.6)}; */
  color: ${({ theme }) => theme.colors.link};
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const StyledLisItem = styled.li`
  margin-left: 1rem;
`

const StyledHeader = styled.h1`
  color: black;
  margin-bottom: 2rem;
  font-weight: 600;
  font-family: 'Principal Trial Semibold';
`

function List(props) {
  const parentSlug = props.slug === '/docs/' ? '/docs' : '/guides'

  const items = props.data.edges
    .filter(({ node }) => {
      return node.fields.topLevelDir === props.parent
    })
    .map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <StyledLisItem key={node.id}>
          <StyledLink
            onClick={() => scrollTo('#docs-header')}
            active={props.path === parentSlug + node.fields.slug}
            to={parentSlug + node.fields.slug}
          >
            {title}
          </StyledLink>
        </StyledLisItem>
      )
    })
  return <StyledList>{items}</StyledList>
}

const SideBar = props => {
  const data = useStaticQuery(graphql`
    query {
      topNavDocs: allDirectory(
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
      topNavGuides: allDirectory(
        filter: {
          sourceInstanceName: { eq: "guides" }
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
      guides: allMdx(
        filter: { fileAbsolutePath: { regex: "/guides/" } }
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

  const listData = props.parent === '/docs/' ? data.docs : data.guides

  const navData =
    props.parent === '/docs/' ? data.topNavDocs : data.topNavGuides

  return (
    <StyledSidebar>
      <StyledHeader>
        {props.parent === '/docs/' ? 'Documentation' : 'Guides'}
      </StyledHeader>
      <Search parent={props.parent === '/docs/' ? 'Docs' : 'Guides'} />
      {navData.edges.map(({ node }) => {
        const title = node.name
          .replace('(?m)^[\\d-]*\\s*', '')
          .replace(/\d/g, '')
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
            <List
              data={listData}
              parent={node.name}
              slug={props.parent}
              path={props.path}
            />
          </StyledSection>
        )
      })}
    </StyledSidebar>
  )
}

export default SideBar
