import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import Search from '../components/search'

import { useStaticQuery, graphql } from 'gatsby'
import '../styles/sidebar.css'
import DropdownArrow from './dropdownArrow.js'

const StyledSidebar = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.link};
  padding: 0rem 4rem 0 0;
  min-width: 256px;
  /* font-size: 1.125rem; */
`

const StyledSection = styled.div`
  /* opacity: ${({ open }) => (open ? 1 : 0.6)}; */
  height: ${({ open }) => (open ? 'inital' : '2.5rem')};
  overflow: hidden;
  cursor: pointer;
`

const StyledLink = styled(({ active, ...props }) => <Link {...props} />)`
  font-weight: ${({ active }) => active && 600};
  background-color: ${({ active }) => active && '#F7F8FA'};
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  margin: 0;
  /* opacity: ${({ active }) => (active ? 1 : 0.6)}; */
  color: ${({ theme }) => theme.colors.link}; 
`

// const StyledLink = styled(Link)`
//   font-weight: ${({ active }) => active && 600};
//   background-color: ${({ active }) => active && '#F7F8FA'};
//   border-radius: 8px;
//   padding: 0.25rem 0.5rem;
//   text-decoration: none;
//   margin: 0;
//   /* opacity: ${({ active }) => (active ? 1 : 0.6)}; */
//   color: ${({ theme }) => theme.colors.link};
// `

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const StyledLisItem = styled.li`
  margin-left: 1rem;
`

const StyledSectionTitle = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
`

const StyledArrow = styled.span`
  display: flex;
  transform-origin: center;
  transform: ${({ open }) => (open ? `rotateZ(0deg)` : `rotateZ(-90deg)`)};
  width: 10px;
  height: 10px;
  margin-left: 0.5rem;
  opacity: 0.4;
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

const CollapsibleList = ({ node, listData, path, parent }) => {
  const [open, setOpen] = useState(node.name === path.split('/')[2])
  const title = node.name
    .replace('(?m)^[\\d-]*\\s*', '')
    .replace(/\d/g, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, function(t) {
      return t.toUpperCase()
    })

  return (
    <StyledSection
      trigger={title}
      transitionTime={250}
      open={open}
      onClick={() => setOpen(!open)}
      easing="ease"
    >
      <StyledSectionTitle>
        {title}
        <StyledArrow open={open}>
          <DropdownArrow />
        </StyledArrow>
      </StyledSectionTitle>
      <List data={listData} parent={node.name} slug={parent} path={path} />
    </StyledSection>
  )
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
      {navData.edges.map(({ node }) => (
        <CollapsibleList
          key={node.id}
          node={node}
          listData={listData}
          path={props.path}
          parent={props.parent}
        />
      ))}
      <Search parent={props.parent === '/docs/' ? 'Docs' : 'Guides'} />
    </StyledSidebar>
  )
}

export default SideBar
