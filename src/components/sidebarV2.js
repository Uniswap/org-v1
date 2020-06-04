import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { useMediaQuery } from '@react-hook/media-query'

import Search from './search'
import { useStaticQuery, graphql } from 'gatsby'
import DropdownArrow from './dropdownArrow.js'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: sticky;
  top: 3rem;
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
  /* cursor: pointer; */
`

// eslint-disable-next-line no-unused-vars
const StyledLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  border-radius: 8px;
  padding: 0.25rem 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.link};
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 400;
`

const StyledListItem = styled.li`
  margin-bottom: 0rem;
`

const StyledInset = styled.div`
  /* margin-left: 0.75rem; */
  margin-bottom: 0.75rem;
`

const StyledSectionTitle = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  font-weight: ${({ open }) => (open ? 500 : 400)};
  font-size: 16px;

  cursor: pointer;
`

const StyledCategoryTitle = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  font-weight: 400;
  user-select: none;
  font-size: 10px;
  opacity: 0.8;
  text-transform: uppercase;
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

const CollapsibleList = ({ node, listData, referenceData, path, parent, topLevel, atTopLevel }) => {
  const [open, setOpen] = useState(true)

  useLayoutEffect(() => {
    setOpen(node.name.replace(/\d+-/g, '') === path.split('/')[3])
  }, [node.name, path, setOpen])

  const section = node.name.replace(/\d+-/g, '')

  const title = node.name
    .replace(/\d+-/g, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, function(t) {
      return t.toUpperCase()
    })

  return (
    // <StyledSection trigger={title} transitionTime={250} open={open} onClick={() => setOpen(!open)} easing="ease">
    // {atTopLevel  (
    //   <StyledLink
    //     style={{ marginBottom: '.75rem', display: 'inline-block', padding: '0px' }}
    //     to={`${topLevel}/${section}`}
    //     isActive={path.split('/')[4] === ''}

    //   >
    //     {title}
    //   </StyledLink>
    // )}

    <StyledSection trigger={title} transitionTime={250} open={open} easing="ease">
      {atTopLevel ? (
        <StyledSectionTitle onClick={() => setOpen(!open)}>{title}</StyledSectionTitle>
      ) : (
        <StyledSectionTitle style={{ fontWeight: '800' }}>{title}</StyledSectionTitle>
      )}
      {open && (
        <StyledInset style={{ marginLeft: atTopLevel ? '.75rem' : '0rem' }}>
          <StyledLink
            style={{ marginBottom: '0rem', display: 'inline-block', padding: '0px' }}
            to={`/${topLevel}/${section}`}
            isActive={path.split('/')[4] === ''}
          >
            Overview
          </StyledLink>
          <List data={listData} parent={node.name} slug={parent} path={path} />
          {!atTopLevel && (
            <>
              {referenceData && <StyledCategoryTitle>Related</StyledCategoryTitle>}
              <ReferenceList data={referenceData} parent={node.name} slug={parent} path={path} />
            </>
          )}
        </StyledInset>
      )}
    </StyledSection>
  )
}

function ReferenceList(props) {
  const items = props.data.edges
    .filter(({ node }) => {
      return node.relativePath.replace(/\d+-/g, '').split('/')[1] === props.parent.replace(/\d+-/g, '')
    })
    .map(({ node }) => {
      const slug = node.relativeDirectory.replace(/\d+-/g, '')
      const title = node.name
        .replace(/\d+-/g, '')
        .replace(/-/g, ' ')
        .replace(/(^|\s)\S/g, function(t) {
          return t.toUpperCase()
        })
      return (
        <StyledListItem key={node.id}>
          <StyledLink onClick={() => scrollTo('#docs-header')} to={'/docs/' + slug + '/' + title}>
            {title}
          </StyledLink>
        </StyledListItem>
      )
    })
  return <StyledList>{items}</StyledList>
}

function List(props) {
  const items = props.data.edges
    .filter(({ node }) => {
      return (
        node.fields.slug.split('/')[3] === props.parent.replace(/\d+-/g, '') && node.fields.slug.split('/')[4] !== ''
      )
    })
    .map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      const activePath = node.fields.slug
      return (
        <StyledListItem key={node.id}>
          <StyledLink onClick={() => scrollTo('#docs-header')} isActive={props.path === activePath} to={activePath}>
            {title}
          </StyledLink>
        </StyledListItem>
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
      v2Reference: allFile(filter: { absolutePath: { regex: "/docs/v2/" }, ext: { eq: ".js" } }) {
        edges {
          node {
            name
            absolutePath
            relativePath
            relativeDirectory
            id
          }
        }
      }
    }
  `)

  const [v2Toggle, setV2Toggle] = useState(true)

  const navData = v2Toggle ? data.topNavDocsV2 : data.topNavDocsV1
  const listData = v2Toggle ? data.docsV2 : data.docsV1

  useLayoutEffect(() => {
    props.path.slice(0, 8) === '/docs/v2' ? setV2Toggle(true) : setV2Toggle(false)
  }, [setV2Toggle])

  const matches = useMediaQuery('only screen and (max-width: 960px)')
  const [isMenuOpen, updateIsMenuOpen] = useState(true)

  const atTopLevel = props.path === '/docs/v1/' || props.path === '/docs/v2/'

  return (
    <StyledSidebar>
      {/* <Search isV1={!v2Toggle} isV2={v2Toggle} /> */}
      <StyledMobileMenu onClick={() => updateIsMenuOpen(!isMenuOpen)}>
        <span>{isMenuOpen ? 'Show Menu' : 'Hide Menu'}</span>
        <StyledArrow open={isMenuOpen}>
          <DropdownArrow />
        </StyledArrow>
      </StyledMobileMenu>
      <ListWrapper open={isMenuOpen && matches}>
        {atTopLevel ? (
          <StyledLink
            isActive={atTopLevel}
            style={{ marginBottom: '.25rem', display: 'inline-block', padding: !atTopLevel && '0px' }}
            to={`/docs/${v2Toggle ? 'v2' : 'v1'}/`}
          >
            Introduction
          </StyledLink>
        ) : (
          <StyledLink
            isActive={atTopLevel}
            style={{ marginBottom: '1rem', display: 'inline-block', padding: !atTopLevel && '0px', fontSize: '14px' }}
            to={`/docs/${v2Toggle ? 'v2' : 'v1'}/`}
          >
            {'<- Back'}
          </StyledLink>
        )}
        {navData.edges
          .filter(({ node }) => {
            return props.path.split('/')[3] === '' || props.path.split('/')[3] === node.name.replace(/\d+-/g, '')
          })
          .map(({ node }) => {
            const hideRender =
              (node.name.split('-')[1] === 'SDK' && atTopLevel) || (node.name.split('-')[1] === 'smart' && atTopLevel)
            return (
              !hideRender && (
                <CollapsibleList
                  key={node.id}
                  node={node}
                  listData={listData}
                  referenceData={data.v2Reference}
                  path={props.path}
                  parent={props.parent}
                  atTopLevel={atTopLevel}
                  topLevel={v2Toggle ? '/docs/v2' : '/docs/v1'}
                />
              )
            )
          })}
      </ListWrapper>
      {atTopLevel && (
        <StyledList style={{ marginTop: '1rem' }}>
          <StyledListItem>
            <StyledLink to={'/docs/v2/SDK'}>SDK</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to={'/docs/v2/API'}>API</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to={'/docs/v2/smart-contracts'}>Smart Contracts</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to={'/'}>Whitepaper</StyledLink>
          </StyledListItem>
        </StyledList>
      )}

      {/* {atTopLevel && (
        <VersionToggle to={v2Toggle ? '/docs/v1' : '/docs/v2'}>
          <VersionLabel toggled={!v2Toggle}>V1</VersionLabel>
          <VersionLabel toggled={v2Toggle}>V2</VersionLabel>
        </VersionToggle>
      )} */}
    </StyledSidebar>
  )
}

export default SideBar
