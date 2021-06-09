import { Trade } from '@uniswap/sdk'
import React, { Fragment, memo, useContext } from 'react'
import { ChevronRight } from 'react-feather'
import { Flex } from 'rebass'
import { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import { unwrappedToken } from 'utils/wrappedCurrency'

export default memo(function SwapRoute({ trade }: { trade: Trade }) {
  const theme = useContext(ThemeContext)
  return (
    <Flex flexWrap="wrap" width="100%" justifyContent="flex-end" alignItems="center">
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        const currency = unwrappedToken(token)
        const analyticsAddress = "https://penguinalytics.eth.link/#/token/" + token.address;
        return (
          <Fragment key={i}>
            <Flex alignItems="end">
              <TYPE.black fontSize={15} color={theme.text1} ml="0.125rem" mr="0.125rem">
                <a href={analyticsAddress}>{currency.symbol}</a>
              </TYPE.black>
            </Flex>
            {isLastItem ? null :         <a
                      href={'https://penguinalytics.eth.link/#/pair/' + trade.route.pairs[i].liquidityToken.address}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                    <ChevronRight size={40} color={theme.text2} /></a>}
          </Fragment>
        )
      })}
    </Flex>
  )
})
