import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { useStaticQuery, graphql } from 'gatsby'
import DropdownArrow from './dropdownArrow.js'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: sticky;
  top: 6rem;
  align-self: flex-start;
  padding-right: 1rem;
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
  height: ${({ open }) => (open ? 'inital' : '1.75rem')};
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
  :hover {
    opacity: 0.6;
  }
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 400;
`

const StyledListItem = styled.li`
  margin-bottom: 0.25rem;
  transition: transform 0.3s ease;
  will-change: transform;
  list-style: none;
  :hover {
    a {
      text-decoration: underline;
    }
  }
`

const StyledInset = styled.div`
  /* margin-left: 0.75rem; */
  border-left: 1px solid ${({ theme }) => theme.colors.grey2};
  margin-bottom: 0.75rem;
`

const StyledSectionTitle = styled.div`
  margin: 0;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  font-weight: ${({ open }) => (open ? 500 : 400)};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.link};

  :hover {
    a {
      text-decoration: underline;
    }
  }
`

const StyledCategoryTitle = styled.div`
  margin: 0;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  font-weight: 500;
  user-select: none;
  font-size: 10px;
  opacity: 0.8;
  text-transform: uppercase;
`

const ListWrapper = styled.span`
  min-width: 200px;
  width: 224px;
  @media (max-width: 960px) {
    margin-bottom: 1rem;
  }
`

const SectionHeader = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  margin: 0.5rem 0;
`

const CollapsibleList = ({ node, listData, referenceData, path, parent, atTopLevel }) => {
  const [open, setOpen] = useState(true)

  useLayoutEffect(() => {
    setOpen(node.name.replace(/\d+-/g, '') === path.split('/')[3])
  }, [node.name, path, setOpen])

  // const section = node.name.replace(/\d+-/g, '')

  const title = node.name
    .replace(/\d+-/g, '')
    .replace(/-/g, ' ')
    .replace(/(^|\s)\S/g, function(t) {
      return t.toUpperCase()
    })

  return (
    <StyledSection trigger={title} transitionTime={250} open={open} easing="ease">
      {atTopLevel ? (
        <StyledSectionTitle onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
          {title}
          <div style={{ marginLeft: '6px', opacity: '0.2', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <DropdownArrow />
          </div>
        </StyledSectionTitle>
      ) : (
        <StyledSectionTitle style={{ fontSize: '16px' }}>{title}</StyledSectionTitle>
      )}
      {open && (
        <>
          <StyledInset style={{ paddingLeft: '.5rem' }}>
            <List data={listData} parent={node.name} slug={parent} path={path} />
          </StyledInset>
          {!atTopLevel && referenceData && (
            <>
              <ReferenceList data={referenceData} parent={node.name} slug={parent} path={path} />
            </>
          )}
        </>
      )}
    </StyledSection>
  )
}

function ReferenceList(props) {
  const items = props.data.edges
    .filter(({ node }) => {
      return (
        node.relativePath.replace(/\d+-/g, '').split('/')[1] === props.parent.replace(/\d+-/g, '') &&
        node.relativePath.replace(/\d+-/g, '').split('/')[2] !== 'index.js'
      )
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
          <StyledLink onClick={() => scrollTo('#docs-header')} to={'/docs/' + slug + '/' + node.name}>
            {title}
          </StyledLink>
        </StyledListItem>
      )
    })

  return (
    <>
      {items.length > 0 && <StyledCategoryTitle>Related</StyledCategoryTitle>}
      <StyledList>{items}</StyledList>
    </>
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

  const v2Toggle = props.path.slice(0, 8) === '/docs/v2'

  const navData = v2Toggle ? data.topNavDocsV2 : data.topNavDocsV1
  const listData = v2Toggle ? data.docsV2 : data.docsV1

  const atTopLevel =
    props.path === '/docs/v1/' || props.path === '/docs/v2/' || props.path === '/docs/v2' || props.path === '/docs/v1'

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
            {'← Back'}
          </StyledLink>
        )}
        {navData.edges
          .filter(({ node }) => {
            return !props.path.split('/')[3] || props.path.split('/')[3] === node.name.replace(/\d+-/g, '')
          })
          .map(({ node }) => {
            const hideRender =
              (node.name.split('-')[1] === 'SDK' && atTopLevel) ||
              (node.name.split('-')[1] === 'API' && atTopLevel) ||
              (node.name.split('-')[1] === 'smart' && atTopLevel) ||
              (node.name.split('-')[1] === 'user' && atTopLevel) ||
              (node.name.split('-')[1] === 'javascript' && atTopLevel) ||
              (node.name.split('-')[1] === 'other' && atTopLevel) ||
              (node.name.split('-')[1] === 'interface' && atTopLevel) ||
              (node.name === 'images' && atTopLevel)

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
        {atTopLevel && (
          <StyledList style={{ marginTop: '1rem' }}>
            <SectionHeader>Developer Guides</SectionHeader>
            {navData.edges
              .filter(({ node }) => {
                return !props.path.split('/')[3] || props.path.split('/')[3] === node.name.replace(/\d+-/g, '')
              })
              .map(({ node }) => {
                const showRender =
                  (node.name.split('-')[1] === 'javascript' && atTopLevel) ||
                  (node.name.split('-')[1] === 'interface' && atTopLevel) ||
                  (node.name.split('-')[2] === 'contract' && atTopLevel)
                return (
                  showRender && (
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
          </StyledList>
        )}

        {atTopLevel && (
          <StyledList style={{ marginTop: '1rem' }}>
            <SectionHeader>Reference</SectionHeader>
            <StyledListItem>
              <StyledLink to={'/docs/v2/SDK/getting-started'}>SDK</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to={'/docs/v2/API/overview'}>API</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to={'/docs/v2/smart-contracts/factory'}>Smart Contracts</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to={'/whitepaper.pdf'}>Whitepaper</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to={'/docs/v2/governance/governance-reference'}>Governance</StyledLink>
            </StyledListItem>
          </StyledList>
        )}
      </ListWrapper>
    </StyledSidebar>
  )
}

export default SideBar
