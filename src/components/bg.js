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
const fallInSmall = keyframes`
  from {
    transform:translateY(-100vh);
  }

  to {
    transform: translateY(-90vh);
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

  @media (max-width: 960px) {
    animation: ${fallInSmall} 0.3s ease;
    height: 300px;
    width: 100%;
    transform: translateY(-150px);
  }
`

const StyledBG = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
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
  background-size: auto;
  background-position: center;
  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`

const BG = () => {
  const data = useStaticQuery(graphql`
    {
      noise: file(relativePath: { eq: "noise.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 800) {
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
