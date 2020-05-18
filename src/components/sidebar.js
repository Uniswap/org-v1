import React, { useState, useLayoutEffect } from 'react'
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
  @media (max-width: 960px) {
    top: 0px;
    position: relative;
    padding: 0rem;
    width: 100%;
    margin-bottom: 1rem;
  }
`

const StyledSection = styled.div`
  height: ${({ open }) => (open ? 'inital' : '2rem')};
  overflow: hidden;
  cursor: pointer;
`

// eslint-disable-next-line no-unused-vars
const StyledLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  border-radius: 8px;
  padding: 0.25rem 0;
  text-decoration: none;
  margin: 0;
  color: ${({ theme }) => theme.colors.link};
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 400;
`

const StyledLisItem = styled.li`
  margin-left: 0.75rem;
`

const StyledSectionTitle = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  font-weight: 400;
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
    font-weight: 400;
    margin: 1rem 0 0 0;
  }
`

// const StaticLink = styled.a`
//   margin-top: 2rem;
//   opacity: 0.8;
//   max-width: 190px;
//   font-size: 0.825rem;
//   line-height: 125%;
//   @media (max-width: 960px) {
//     display: none;
//   }
// `

const VersionLabel = styled.span`
  padding: 0.01rem 0.5rem 0 0.5rem;
  border-radius: 12px;
  background: ${({ theme, toggled }) => (toggled ? theme.colors.link : 'none')};
  color: ${({ theme, toggled }) => (toggled ? theme.invertedTextColor : theme.colors.link)};

  font-size: 0.825rem;
  font-weight: 400;
`

const VersionToggle = styled(Link)`
  border-radius: 14px;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.pink3};
  color: ${({ theme }) => theme.invertedTextColor};
  display: flex;
  width: fit-content;
  cursor: pointer;
`

const ListWrapper = styled.span`
  display: ${({ open }) => (open ? 'none' : 'initial')};
  min-width: 240px;
  @media (max-width: 960px) {
    margin-bottom: 1rem;
  }
`

const CollapsibleList = ({ node, listData, path, parent }) => {
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    setOpen(node.name.replace(/\d+-/g, '') === path.split('/')[3])
  }, [node.name, path, setOpen])

  const title = node.name
    .replace(/\d+-/g, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, function(t) {
      return t.toUpperCase()
    })

  return (
    <StyledSection trigger={title} transitionTime={250} open={open} onClick={() => setOpen(!open)} easing="ease">
      <StyledSectionTitle>{title}</StyledSectionTitle>
      {open && <List data={listData} parent={node.name} slug={parent} path={path} />}
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
      guides: allMdx(
        filter: { fileAbsolutePath: { regex: "/guides/" } }
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
    }
  `)

  const isDocs = props.parent === '/docs/'

  const [v2Toggle, setV2Toggle] = useState(true)

  const navData = isDocs ? (v2Toggle ? data.topNavDocsV2 : data.topNavDocsV1) : data.topNavGuides
  const listData = isDocs ? (v2Toggle ? data.docsV2 : data.docsV1) : data.guides

  useLayoutEffect(() => {
    isDocs && props.path.slice(0, 8) === '/docs/v2' ? setV2Toggle(true) : setV2Toggle(false)
  }, [setV2Toggle])

  const matches = useMediaQuery('only screen and (max-width: 960px)')
  const [isMenuOpen, updateIsMenuOpen] = useState(true)

  const atTopLevel = props.path === '/docs/v1/' || props.path === '/docs/v2/'

  return (
    <StyledSidebar>
      <Search isDocs={isDocs} isV1={!v2Toggle} isV2={v2Toggle} />
      <StyledMobileMenu onClick={() => updateIsMenuOpen(!isMenuOpen)}>
        <span>{isMenuOpen ? 'Show Menu' : 'Hide Menu'}</span>
        <StyledArrow open={isMenuOpen}>
          <DropdownArrow />
        </StyledArrow>
      </StyledMobileMenu>
      <ListWrapper open={isMenuOpen && matches}>
        <VersionToggle to={v2Toggle ? '/docs/v2' : '/docs/v1'}>
          <VersionLabel toggled={!v2Toggle}>V1</VersionLabel>
          <VersionLabel toggled={v2Toggle}>V2</VersionLabel>
        </VersionToggle>
        <StyledLink
          isActive={atTopLevel}
          style={{ marginBottom: '.25rem', display: 'inline-block', padding: !atTopLevel && '0px' }}
          to={`/docs/${v2Toggle ? 'v2' : 'v1'}/`}
        >
          Introduction
        </StyledLink>
        {navData.edges.map(({ node }) => (
          <CollapsibleList key={node.id} node={node} listData={listData} path={props.path} parent={props.parent} />
        ))}
      </ListWrapper>
    </StyledSidebar>
  )
}

export default SideBar
