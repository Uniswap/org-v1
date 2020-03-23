import React from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'
import Img from 'gatsby-image'

const StyledAbout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`

const StyledSectionFlex = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: ${({ wrapSmall }) => (!wrapSmall ? 'row' : 'column')};
  }
  @media (max-width: 960px) {
    padding: 1rem;
    margin-top: 0rem;
    width: 100%;
    max-width: 450px;
    /* flex-direction: column; */
  }
  h1,
  h2 {
    /* margin-bottom: 0.5rem; */
    max-width: 650px;
  }
  p {
    /* margin-bottom: 0.5rem; */
    max-width: 650px;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  /* font-size: 72px; */
  margin: 2rem 0 3rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  /* text-align: center; */
  @media (max-width: 960px) {
    font-size: 3rem;
  }
`

const StyledCardBG = styled(Img)`
  width: 100%;
  height: 250px;
  background-size: auto;
  background-position: center;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  /* z-index: -1; */
`

const Success = props => {
  const data = useStaticQuery(graphql`
    {
      unicornImage: file(relativePath: { eq: "uni_image.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <Layout path={props.location.pathname} nofooter={true}>
      <BG />
      <SEO title="Success" path={props.location.pathname} />
      <StyledAbout>
        <StyledSectionFlex style={{ flexDirection: 'column', paddingBottom: '0px' }}>
          <StyledCardBG fluid={data.unicornImage.childImageSharp.fluid} />
          <Title style={{ width: '100%' }}>You are now subscribed.</Title>
          <p>
            {"We'll be in touch soon. You can always unsubscribe"}
            <a href="https://uniswap.us19.list-manage.com/unsubscribe?u=c93471c1443f1e6365b5ca093&id=7d591bff13">
              {' here.'}
            </a>
          </p>
          <Link to="/">Back home</Link>
        </StyledSectionFlex>
      </StyledAbout>
    </Layout>
  )
}

export default Success
