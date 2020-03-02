// src/components/CodeBlock.js
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import styled from 'styled-components'
import useClipboard from 'react-use-clipboard'
import '../../styles/prism-github.css'

const Wrapper = styled.div`
  font-family: sans-serif;
  position: relative;
`
const Pre = styled.pre`
  text-align: left;
  font-size: 1rem;
  margin: 1em 0;
  padding: 0.5em;
  line-height: 1.75;
  overflow: scroll;
  border-radius: 0.25rem;

  div span:last-child {
    display: none !important;
  }
`

// const LineNo = styled.span`
//   display: inline-block;
//   width: 2em;
//   user-select: none;
//   opacity: 0.3;
// `

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${({ theme }) => theme.colors.grey2};
  border: none;
  color: ${({ theme }) => theme.colors.link};
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  :focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.grey3};
  }
`

export default ({ children, className }) => {
  const language = className.replace(/language-/, '')
  const [isCopied, setCopied] = useClipboard(children, {
    successDuration: 1000
  })

  return (
    <Wrapper>
      <CopyButton onClick={setCopied}>{isCopied ? 'Copied' : 'Copy'}</CopyButton>
      <Highlight {...defaultProps} code={children} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {/* <LineNo>{i + 1}</LineNo> */}
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
