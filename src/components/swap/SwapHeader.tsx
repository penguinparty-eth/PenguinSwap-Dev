import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`
const StyledRouletteButton = styled.button`
  color: ${({ theme }) => theme.text1};
  font-weight: 500;
  font-size: 0.9rem;
  position: relative;
  width: 25%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }
  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <TYPE.black fontWeight={500}>Swap</TYPE.black>
        </RowBetween>
        <RowBetween>
        <StyledRouletteButton onClick={() => window.location.assign('https://penguinswap.eth.link/#/swap?outputCurrency=0x30bcd71b8d21fe830e493b30e90befba29de9114')}>
        Roulette
        </StyledRouletteButton>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  )
}
