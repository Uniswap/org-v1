import React from 'react'
import styled, { useTheme } from 'styled-components'
import useClipboard from 'react-use-clipboard'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prismjs'
import themeLight from 'prism-react-renderer/themes/nightOwlLight'
import themeDark from 'prism-react-renderer/themes/nightOwl'

import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

require('prismjs/components/prism-solidity')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-python')

const Wrapper = styled.div`
  position: relative;
`

// const LineNo = styled.span`
//   display: inline-block;
//   width: 2em;
//   user-select: none;
//   opacity: 0.3;
// `

const Pre = styled.pre`
  text-align: left;
  font-size: 1rem;
  margin: 1em 0;
  padding: 0.5em;
  line-height: 1.75;
  overflow: auto;
  border-radius: 0.25rem;
  text-shadow: none !important;

  .operator {
    background: none !important; /* remove background around = in dark mode */
  }
`

const CopyButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  const language = className && className.replace(/language-/, '')
  const [isCopied, setCopied] = useClipboard(children, {
    successDuration: 1000
  })

  const theme = useTheme()
  const isDark = theme.textColor === '#FFFFFF'

  return (
    <Highlight
      {...defaultProps}
      Prism={Prism}
      code={children}
      language={language}
      theme={isDark ? themeDark : themeLight}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Wrapper>
          <Pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => {
              return line[0].empty ? (
                i === tokens.length - 1 ? null : (
                  <br key={i} />
                )
              ) : (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {/* <LineNo>{i + 1}</LineNo> */}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </Pre>
          <CopyButton onClick={setCopied}>{isCopied ? 'Copied' : 'Copy'}</CopyButton>
        </Wrapper>
      )}
    </Highlight>
  )
}
