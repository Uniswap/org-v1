import React from 'react'
import theme from 'prism-react-renderer/themes/github'
import styled from 'styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'

import './code.css' // Tell Webpack that Button.js uses these styles

const Wrapper = styled.div`
  font-family: sans-serif;
`

const Pre = styled.pre`
  text-align: left;
  font-size: 1rem;
  /* margin: 1em 0; */
  padding: 0.5em;
  line-height: 1.75;
  overflow: scroll;
  border-radius: 0.25rem;
`

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`

const Code = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : ''

  return (
    <Wrapper>
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
    </Wrapper>
  )
}

export default Code
