import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

const fallIn = keyframes`
  from {
    transform:translateY(-100vh);
  }

  to {
    transform: translateY(-70vh);
  }
`

const StyledRed = styled.div`
  width: 100%;
  height: 150vh;
  border-radius: 10vw;
  background: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${theme.colors.link} 0%, ${theme.backgroundColor} 100%)`};
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0.2;
  animation: ${fallIn} 0.3s ease;
  transform: translateY(-70vh);
`

const StyledBG = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  -webkit-transform: translate3d(0, 0, 0);
`

const StyledNoise = styled(BackgroundImage)`
  width: 100%;
  height: 100vh;
  mix-blend-mode: overlay;
  position: absolute;
  top: 0px;
  background-repeat: repeat;
  left: 0px;
  width: 100%;
  background-size: auto;
  background-position: center;
`

const BG = () => {
  const data = useStaticQuery(graphql`
    {
      noise: file(relativePath: { eq: "noise.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <StyledBG>
      <StyledRed />
      <StyledNoise fluid={data.noise.childImageSharp.fluid} />
    </StyledBG>
  )
}
export default BG
