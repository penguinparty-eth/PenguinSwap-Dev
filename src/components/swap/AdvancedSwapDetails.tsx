import { Trade, TradeType } from '@uniswap/sdk'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Field } from '../../state/swap/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
// import { useActiveWeb3React } from '../../hooks'
import useUSDCPrice from '../../utils/useUSDCPrice'
// import { UNI } from '../../constants'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const theme = useContext(ThemeContext)
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  // const { chainId } = useActiveWeb3React()
  const inputToken = trade.inputAmount.currency
  const outputToken = trade.outputAmount.currency
  const usdcOutputPrice = useUSDCPrice(outputToken)
  const usdcInputPrice = useUSDCPrice(inputToken)

  const totalInputUsdc =
    parseFloat(slippageAdjustedAmounts[Field.INPUT].toExact()) * parseFloat(usdcInputPrice.toSignificant())
  console.log(slippageAdjustedAmounts[Field.INPUT].toExact())

  const totalOutputUsdc =
    parseFloat(slippageAdjustedAmounts[Field.OUTPUT].toExact()) * parseFloat(usdcOutputPrice.toSignificant())
  console.log(totalOutputUsdc)

  const routerFeePercentage = 0.0025
  const routerFee = (totalInputUsdc * routerFeePercentage).toPrecision(2)
  //debugger
  return (
    <div style={{ borderTop: '2px dotted grey' }}>
      <AutoColumn style={{ padding: '1rem 16px' }}>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
              {'Rate'}
            </TYPE.black>
            <QuestionHelper text="This is the value of Token A as it relates to Token B" />
          </RowFixed>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {'1 ' + inputToken.name + ' = ' + trade.executionPrice?.toFixed(2) + ' ' + outputToken.name}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
              {'USD Rate'}
            </TYPE.black>
            <QuestionHelper text="This is the value of token A in USDC" />
          </RowFixed>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {'1 ' + inputToken.name + ' = $' + usdcInputPrice.toFixed(2)}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
              {isExactIn ? 'Minimum received' : 'Maximum sold'}
            </TYPE.black>
            <QuestionHelper text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." />
          </RowFixed>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {isExactIn
                ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${
                    trade.outputAmount.currency.symbol
                  } ${'/ $' +
                    (
                      Number(slippageAdjustedAmounts.OUTPUT.toSignificant(4)) * Number(usdcOutputPrice.toFixed(2))
                    ).toFixed(2)} ` ?? '-'
                : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                  '-'}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
              {'Price Impact'}
            </TYPE.black>
            <QuestionHelper text="The difference between the market price and estimated price due to trade size." />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
              {'Liquidity Provider Fee'}
            </TYPE.black>
            <QuestionHelper text="A portion of each trade (0.30%) goes to liquidity providers as a protocol incentive." />
          </RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </TYPE.black>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
              {'Router Fee'}
            </TYPE.black>
            <QuestionHelper text="A portion of each trade (0.25%) goes to development of the platform." />
          </RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            {'$' + routerFee}
          </TYPE.black>
        </RowBetween>
      </AutoColumn>
    </div>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const theme = useContext(ThemeContext)

  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)
  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween style={{ padding: '0 1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <TYPE.black fontSize={14} fontWeight={600} color={theme.text2}>
                    {'Route'}
                  </TYPE.black>
                  <QuestionHelper text="Routing through these tokens resulted in the best price for your trade." />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
