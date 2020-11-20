import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

// import Search from './search'
import { useStaticQuery, graphql } from 'gatsby'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: sticky;
  top: 6rem;
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

const StyledListItem = styled.li`
  margin-bottom: 0.25rem;
`

const StyledInset = styled.div``

const ListWrapper = styled.span`
  min-width: 240px;
  @media (max-width: 960px) {
    margin-bottom: 1rem;
  }
`

const CollapsibleList = ({ node, listData, path, parent, topLevel, atTopLevel }) => {
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

    <StyledSection trigger={title} transitionTime={250} open={open} easing="ease">
      {atTopLevel && (
        <StyledLink
          style={{ marginBottom: '.75rem', display: 'inline-block', padding: '0px' }}
          to={`${topLevel}/${section}`}
          isActive={path.split('/')[4] === ''}
        >
          {title}
        </StyledLink>
      )}
      {open && (
        <StyledInset>
          <List data={listData} parent={node.name} slug={parent} path={path} />
        </StyledInset>
      )}
    </StyledSection>
  )
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
    }
  `)

  // get global version and check if v2 or not
  const v2Toggle = props.path.slice(0, 8) === '/docs/v2'

  const navData = v2Toggle ? data.topNavDocsV2 : data.topNavDocsV1
  const listData = v2Toggle ? data.docsV2 : data.docsV1

  const atTopLevel = props.path === '/docs/v1/' || props.path === '/docs/v2/'

  return (
    <StyledSidebar>
      <ListWrapper>
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
            {'← Home'}
          </StyledLink>
        )}
        {navData.edges
          .filter(({ node }) => {
            return !props.path.split('/')[3] || props.path.split('/')[3] === node.name.replace(/\d+-/g, '')
          })
          .map(({ node }) => (
            <CollapsibleList
              key={node.id}
              node={node}
              listData={listData}
              path={props.path}
              parent={props.parent}
              atTopLevel={atTopLevel}
              topLevel={v2Toggle ? '/docs/v2' : '/docs/v1'}
            />
          ))}
      </ListWrapper>
    </StyledSidebar>
  )
}

export default SideBar
