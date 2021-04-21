import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AutoColumn } from './column'
import { Text } from 'rebass/styled-components'
import { Slider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AutoRow, RowFixed } from './row'
import Tooltip from '@material-ui/core/Tooltip'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 122, 0.7);
  }

  15% {
    box-shadow: 0 0 0 10px rgba(255, 0, 122, 0);
  }

  30% {
    box-shadow: 0 0 0 0 rgba(255, 0, 122, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 122, 0);
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);

  animation: ${pulse} 5s linear infinite;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`

const Left = styled.div`
  background: ${({ theme }) => theme.colors.grey2};
  padding: 24px;
  width: 100%;
  width: 500px;
  @media (max-width: 560px) {
    width: 100%;
  }
`

const Right = styled.div`
  background: ${({ theme }) => theme.colors.grey1};
  padding: 24px;
  width: 100%;
  > * {
    flex-wrap: nowrap;
  }
`

const SliderWrapper = styled.div`
  margin-top: 12px;
  width: 100%;
`

const Circle = styled.div<{ background: string }>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${({ background }) => background};
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 280px; */
  background-color: ${({ theme }) => theme.colors.grey3};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  position: relative;
  border-radius: 12px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.grey9};
  background-color: transparent;
  position: relative;
  font-weight: 500;
  outline: none;
  width: 100%;
  border: none;
  font-size: 24px;
  text-align: left;
  margin-left: 32px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
  }
`

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const marks = [{ value: 1820, label: 'Current Price: $1,820' }]

const LabelWrapper = styled.div`
  position: absolute;
  background: blue;
  top: -22px;
`

const StyledTooltip = styled(Tooltip)`
  background: ${({ theme }) => theme.colors.grey2};
`

const StyledSlider = withStyles({
  root: {
    color: '#ff007a'
  },
  valueLabel: {
    top: -28,
    fontSize: 16,
    '& *': {
      background: 'transparent',
      color: '#000'
    }
  },
  mark: {
    backgroundColor: '#ff007a',
    height: 20,
    width: 2,
    marginTop: -8
  },
  markLabel: {
    marginTop: '6px',
    color: '#757881'
  }
})(Slider)

function ValueLabelComponent(props) {
  const { children, open, value } = props

  return (
    <StyledTooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </StyledTooltip>
  )
}

export default function Simulator() {
  const [amount, setAmount] = useState('150000')

  const [slideValue, setSlideValue] = useState([1200, 2800])

  const handleChange = (e, val) => {
    setSlideValue(val)
  }

  const formatText = val => {
    return formatter.format(val)
  }

  const a = slideValue[0]
  const b = slideValue[1]
  const e = 1 / (1 - 1 / Math.sqrt(Math.sqrt(b / a)))

  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

  function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      setAmount(nextUserInput)
    }
  }

  const [pulse, setPulse] = useState(true)

  return (
    <Wrapper>
      <Left>
        <AutoColumn gap="32px" justify="left">
          <AutoColumn justify="left" gap="8px">
            <AutoColumn justify=" ">
              <Text fontWeight={600} fontSize="14px">
                Liquidity Deposit Value
              </Text>
              <Text fontWeight={400} fontSize="14px">
                Value of paired tokens
              </Text>
            </AutoColumn>
            <InputWrapper pulse={pulse} onFocus={() => setPulse(false)}>
              <Text style={{ position: 'absolute', left: '8px', opacity: 0.4 }} fontSize="24px">
                $
              </Text>
              <StyledInput
                value={amount}
                onChange={e => {
                  enforcer(e.target.value.replace(/,/g, '.'))
                }}
                // universal input options
                inputMode="decimal"
                title="Token Amount"
                autoComplete="off"
                autoCorrect="off"
                // text-specific options
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder={'0'}
              />
            </InputWrapper>
          </AutoColumn>
          <Text fontWeight={600} fontSize="14px">
            Select ETH price range
          </Text>

          <SliderWrapper>
            <StyledSlider
              value={slideValue}
              onChange={handleChange}
              aria-labelledby="range-slider"
              valueLabelDisplay="on"
              getAriaValueText={formatText}
              valueLabelFormat={formatText}
              marks={marks}
              min={1}
              max={4000}
              ValueLabelComponent={ValueLabelComponent}
            />
          </SliderWrapper>
        </AutoColumn>
      </Left>
      <Right>
        <AutoRow gap="16px" style={{ alignItems: 'flex-start' }}>
          <AutoColumn gap="16px">
            <RowFixed>
              <Circle background="#27AE60" />
              <Text fontSize="14px" fontWeight={700} ml="8px" style={{ whiteSpace: 'nowrap' }}>
                V3 Range Position
              </Text>
            </RowFixed>
            <AutoColumn>
              <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                Capital Required
              </Text>
              <Text fontSize="24px" fontWeight={700} color="#27AE60" style={{ whiteSpace: 'nowrap' }}>
                {amount ? formatter.format(parseFloat(amount)) : '-'}
              </Text>
            </AutoColumn>
            <AutoColumn>
              <Text fontSize="14px">Fees per $ vs. V2</Text>
              <Text fontSize="24px" fontWeight={700} color="#27AE60">
                {e.toFixed(2)}x
              </Text>
            </AutoColumn>
          </AutoColumn>
          <AutoColumn gap="16px">
            <RowFixed>
              <Circle background="#C4C4C4" />
              <Text fontSize="14px" fontWeight={700} ml="8px" style={{ whiteSpace: 'nowrap' }}>
                V2 Position
              </Text>
            </RowFixed>
            <AutoColumn>
              <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                Capital Required
              </Text>
              <Text fontSize="24px" fontWeight={700} style={{ whiteSpace: 'nowrap' }}>
                {amount ? formatter.format(e * parseFloat(amount)) : '-'}
              </Text>
            </AutoColumn>
          </AutoColumn>
        </AutoRow>
        <Text mt="24px" fontSize="12px">
          These two positions will earn equal fees and perform idenitcally while the price remains between $
          {slideValue[0]} and ${slideValue[1]}.
        </Text>
      </Right>
    </Wrapper>
  )
}
