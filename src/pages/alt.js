import React from 'react'
import styled, { keyframes } from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo2'
import { Helmet } from 'react-helmet'

import Card from '../components/card'
import Marquee from '../components/marquee'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'

import Circle from '../images/circle.inline.svg'
import Star from '../images/star.inline.svg'

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f7f8fa;
`
const StyledNoise = styled(BackgroundImage)`
  width: 100vw;
  height: 100vh;
  mix-blend-mode: overlay;
  position: absolute;
  top: 0px;
  left: 0px;
`

const fallIn = keyframes`
  from {
    transform: translateY(-100vh);
  }

  to {
    transform: translateY(-50vh);
  }
`

const StyledRed = styled.div`
  width: 100vw;
  height: 100vh;
  border-radius: 10vw;
  background: radial-gradient(50% 50% at 50% 50%, #ff64a5 0%, #f7f8fa 100%);
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0.4;
  transform: translateY(-50vh);
  animation: ${fallIn} 2s cubic-bezier(1, 0, 0, 1);
`

const IndexPage = props => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          cardlinks {
            cardButton
            cardDesc
            cardTitle
            type
            slug
          }
        }
      }
      unicornImage: file(relativePath: { eq: "uni_image.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      line: file(relativePath: { eq: "sq.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      noise: file(relativePath: { eq: "noise.png" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <StyledBody>
        <div>
          <StyledRed />
          <StyledNoise fluid={data.noise.childImageSharp.fluid} />
        </div>
        Test
      </StyledBody>
    </Layout>
  )
}

export default IndexPage
