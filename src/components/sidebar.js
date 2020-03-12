import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { useMediaQuery } from '@react-hook/media-query'

import Search from '../components/search'

import { useStaticQuery, graphql } from 'gatsby'
import DropdownArrow from './dropdownArrow.js'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: sticky;
  top: 4rem;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.link};
  padding: 0rem 4rem 0 0;
  min-width: 300px;
  @media (max-width: 960px) {
    top: 0px;
    position: relative;
    padding: 0rem;
    width: 100%;
  }
`

const StyledSection = styled.div`
  height: ${({ open }) => (open ? 'inital' : '2.5rem')};
  overflow: hidden;
  cursor: pointer;
`

// eslint-disable-next-line no-unused-vars
const StyledLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  font-weight: ${({ isActive }) => isActive && 600};
  background-color: ${({ isActive, theme }) => isActive && theme.cardBG};
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  margin: 0;
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
  transform: ${({ open }) => (open ? `rotateZ(0deg)` : `rotateZ(-180deg)`)};
  width: 10px;
  height: 10px;
  margin-left: 0.5rem;
  opacity: 1;
`

const StyledMobileMenu = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0;
    font-weight: 600;
    margin: 1rem 0 0 0;
  }
`

const ListWrapper = styled.span`
  display: ${({ open }) => (open ? 'none' : 'initial')};
`

const CollapsibleList = ({ node, listData, path, parent }) => {
  const [open, setOpen] = useState(node.name.replace(/\d+-/g, '') === path.split('/')[3])

  const title = node.name
    .replace(/\d+-/g, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, function(t) {
      return t.toUpperCase()
    })

  return (
    <StyledSection trigger={title} transitionTime={250} open={open} onClick={() => setOpen(!open)} easing="ease">
      <StyledSectionTitle>{title}</StyledSectionTitle>
      <List data={listData} parent={node.name} slug={parent} path={path} />
    </StyledSection>
  )
}

function List(props) {
  const items = props.data.edges
    .filter(({ node }) => {
      return node.fields.slug.split('/')[3] === props.parent.replace(/\d+-/g, '')
    })
    .map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      const activePath = node.fields.slug
      return (
        <StyledLisItem key={node.id}>
          <StyledLink onClick={() => scrollTo('#docs-header')} isActive={props.path === activePath} to={activePath}>
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
      topNavDocsV1: allDirectory(
        filter: { sourceInstanceName: { eq: "docs" }, relativeDirectory: { eq: "v1" } }
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
      topNavDocsV2: allDirectory(
        filter: { sourceInstanceName: { eq: "docs" }, relativeDirectory: { eq: "v2" } }
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
        filter: { sourceInstanceName: { eq: "guides" }, relativeDirectory: { eq: "" } }
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
      docsV1: allMdx(
        filter: { fileAbsolutePath: { regex: "/docs/v1/" } }
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
      docsV2: allMdx(
        filter: { fileAbsolutePath: { regex: "/docs/v2/" } }
        sort: { order: ASC, fields: fileAbsolutePath }
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
      guides: allMdx(filter: { fileAbsolutePath: { regex: "/guides/" } }, sort: { order: ASC, fields: fields___slug }) {
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

  const isDocs = props.parent === '/docs/'
  const isV1 = isDocs && props.path.slice(0, 8) === '/docs/v1'

  const navData = isDocs ? (isV1 ? data.topNavDocsV1 : data.topNavDocsV2) : data.topNavGuides
  const listData = isDocs ? (isV1 ? data.docsV1 : data.docsV2) : data.guides

  const matches = useMediaQuery('only screen and (max-width: 960px)')
  const [isMenuOpen, updateIsMenuOpen] = useState(true)

  return (
    <StyledSidebar>
      <Search isDocs={isDocs} isV1={isV1} isV2={isDocs && !isV1} />

      <StyledMobileMenu onClick={() => updateIsMenuOpen(!isMenuOpen)}>
        <span>{isMenuOpen ? 'Show Menu' : 'Hide Menu'}</span>
        <StyledArrow open={isMenuOpen}>
          <DropdownArrow />
        </StyledArrow>
      </StyledMobileMenu>
      <ListWrapper open={isMenuOpen && matches}>
        {navData.edges.map(({ node }) => (
          <CollapsibleList key={node.id} node={node} listData={listData} path={props.path} parent={props.parent} />
        ))}
      </ListWrapper>

      <a
        href="https://docs.uniswap.io/"
        target="_blank"
        rel="noreferrer noopener"
        style={{
          marginTop: '2rem',
          opacity: 0.8,
          maxWidth: '190px',
          fontSize: '.825rem',
          lineHeight: '125%'
          // backgroundColor: 'rgba(0,0,0,0.05)',
          // borderRadius: '8px',
          // padding: '1rem'
        }}
      >
        V1 Docs
      </a>
      {/* <a
        href="https://docs.uniswap.io/"
        target="_blank"
        rel="noreferrer noopener"
        style={{
          marginTop: '.5rem',
          opacity: 0.8,
          maxWidth: '190px',
          fontSize: '.825rem',
          lineHeight: '125%'
          // backgroundColor: 'rgba(0,0,0,0.05)',
          // borderRadius: '8px',
          // padding: '1rem'
        }}
      >
        View on Github
      </a> */}
    </StyledSidebar>
  )
}

export default SideBar
