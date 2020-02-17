import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const moveHorizonatally = x => keyframes`
    0% {
        transform : translateX(0px) 
    }
    100% {
        transform : translateX(${x}px)
    }
`

const Stats = styled.div`
  animation: ${props => moveHorizonatally(props.x)} ${props => props.time}s
    linear infinite;
  :hover {
    animation-play-state: paused;
  }
`

const Marquee = ({ children }) => {
  const node = useRef()
  const [elementWidth, setElementWidth] = useState(0)

  useEffect(() => {
    // console.log(node.current.offsetWidth - window.innerWidth)
    setElementWidth(node.current.offsetWidth - window.innerWidth)
  }, [setElementWidth])

  return (
    <Stats
      x={-elementWidth}
      time={70}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
      }}
      ref={node}
    >
      {children}
    </Stats>
  )
}

export default Marquee

// import React, { useState, useRef, useEffect } from 'react'

// const FPS = 10
// const STEP = 1

// const Marquee = ({ children }) => {
//   const node = useRef()
//   const [elementWidth, setElementWidth] = useState(0)
//   const [offset, setOffset] = useState(0)

//   useEffect(() => {
//     console.log(node.current.offsetWidth - window.innerWidth)
//     setElementWidth(node.current.offsetWidth)
//   }, [setElementWidth])

//   useEffect(() => {
//     const id = setInterval(() => {
//       setOffset(c => (-c > elementWidth - window.innerWidth ? 0 : c - STEP))
//     }, FPS)
//     return () => clearInterval(id)
//   }, [elementWidth]) // ✅ Our effect doesn't use any variables in the component scope

//   return (
//     <span
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'nowrap',
//         transform: `translateX(${offset}px)`,
//         transition: 'transform .1s ease'
//       }}
//       ref={node}
//     >
//       {children}
//     </span>
//   )
// }
// export default Marquee
