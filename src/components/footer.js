import { Link } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
// import { ThemeManagerContext } from '../styles/themeManager'

function Dropdown(props) {
  const items = props.links.map(node => {
    const title = node.name
    return (
      <StyledFooterLink key={node.name}>
        {node.link.split('.').slice(-1)[0] === 'pdf' ? (
          <a href={node.link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        ) : node.link.split('/')[0] === '' ? (
          <Link to={node.link}>{title}</Link>
        ) : (
          <a href={node.link}>{title}</a>
        )}
      </StyledFooterLink>
    )
  })
  return <StyledFooterLinkSection>{items}</StyledFooterLinkSection>
}

const StyledFooter = styled.footer`
  margin-bottom: 7rem;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.link};
  position: relative;
  padding: 0 2rem;

  @media (max-width: 960px) {
    margin-bottom: 2rem;
    flex-direction: column;
    padding: 0rem 1rem;
  }
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media (max-width: 960px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 0em;
  }
`

const StyledFooterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  @media (max-width: 960px) {
    padding-left: 0rem;
    margin-bottom: 0rem;
  }
`

const StyledFooterSectionNav = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding-left: 5rem;
  @media (max-width: 960px) {
    padding-left: 0rem;
    margin-bottom: 0rem;
    display: none;
  }
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
    color: ${({ theme }) => theme.colors.link};
  }
  :hover {
    a {
      text-decoration: underline;
    }
  }
`

const Commit = styled.div``

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          commit
          repository
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

  // const themeContext = useContext(ThemeManagerContext)

  return (
    <StyledFooter>
      <StyledSection>
        <StyledFooterSection>
          <EmailSection />
          <Commit>
            Deployed commit:{' '}
            <code>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${data.site.siteMetadata.repository}/commit/${data.site.siteMetadata.commit}`}
              >
                {data.site.siteMetadata.commit.substring(0, 7)}
              </a>
            </code>
          </Commit>
          <p>© 2020 Uniswap</p>
          {/* <div>
            <label>
              <input type="checkbox" onChange={() => themeContext.toggleDark()} checked={themeContext.isDark} /> Dark
              mode
            </label>
          </div> */}
        </StyledFooterSection>
      </StyledSection>
      <StyledSection>
        {data.site.siteMetadata.menulinks.map(item => {
          return (
            <StyledFooterSectionNav key={item.name}>
              <h4 style={{ fontWeight: 400, marginBottom: '1rem' }}>{item.name}</h4>
              <Dropdown links={item.sublinks} />
            </StyledFooterSectionNav>
          )
        })}
      </StyledSection>
    </StyledFooter>
  )
}
export default Footer

const EmailRow = styled.form`
  display: flex;
  flex-direction: row;
`

const InputButton = styled.input`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  color: ${({ theme }) => theme.invertedTextColor};
  border-radius: 12px;
  margin-right: 0.5rem;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;
  box-sizing: border-box;
  font-weight: 400;
  border: none;

  :hover {
    transform: scale(1);
    cursor: pointer;
  }
  @media (max-width: 960px) {
    margin-right: 0.5rem;
    text-align: center;
    text-decoration: none;
    font-size: 0.825rem;
    padding: 0.25rem 1rem;
  }

  outline-color: transparent;
  outline-style: none;
`

const StyledInput = styled.input`
  border-radius: 8px;
  margin-right: 10px;
  box-shadow: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.chaliceGray};
  max-width: 280px;

  padding: 4px 0 4px 10px;

  :focus {
    outline-color: transparent;
    outline-style: none;
    border: 1px solid ${({ theme }) => theme.colors.link};
  }
`

const StyledGoal = styled.div`
  color: ${({ theme }) => theme.colors.link};
  p {
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
`

const EmailSection = () => {
  const [email, setEmail] = useState('')

  return (
    <StyledGoal style={{ width: '100%', maxWidth: '450px' }}>
      <p>Subscribe to our newsletter for updates</p>

      <EmailRow
        action="https://uniswap.us19.list-manage.com/subscribe/post?u=c93471c1443f1e6365b5ca093&amp;id=7d591bff13"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        novalidate
      >
        <StyledInput
          type="email"
          value={email}
          name="EMAIL"
          id="mce-EMAIL"
          placeholder="your@email.com"
          required
          onChange={val => setEmail(val.target.value)}
        />
        <div>
          <InputButton type="submit" value="->" name="subscribe" id="mc-embedded-subscribe" />
        </div>
      </EmailRow>
    </StyledGoal>
  )
}
