import { ChainId, TokenAmount } from '@uniswap/sdk'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { FISH, SHRIMP, TORI, CRAB } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useTotalUniEarned } from '../../state/stake/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, UniTokenAnimated } from '../../theme'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

// const AnalyticsLink = styled(ExternalLink)`
// color: white;
// `

/**
 * Content for balance stats modal
 */
export default function UniBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const uni = chainId ? FISH : undefined
  const shrimp = chainId ? SHRIMP : undefined
  const crab = chainId ? CRAB : undefined
  const tori = chainId ? TORI : undefined
  const totalSupplyShrimp: TokenAmount | undefined = useTotalSupply(shrimp)
  const totalSupplyCrab: TokenAmount | undefined = useTotalSupply(crab)
  const totalSupplyTori: TokenAmount | undefined = useTotalSupply(tori)
  const total = useTokenBalance()
  const uniBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, uni)
  const uniToClaim: TokenAmount | undefined = useTotalUniEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(uni)
  const uniPrice = useUSDCPrice(uni)
  const shrimpPrice = useUSDCPrice(shrimp)
  const crabPrice = useUSDCPrice(crab)
  const toriPrice = useUSDCPrice(tori)

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">
              Your{' '}
              <span role="img" aria-label="FISH">
                🐟
              </span>{' '}
              Breakdown
            </TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{uniBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">
                    Unclaimed{' '}
                    <span role="img" aria-label="FISH">
                      🐟
                    </span>{' '}
                    :
                  </TYPE.white>
                  <TYPE.white color="white">
                    {uniToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {uniToClaim && uniToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowUniBalanceModal(false)} to="/uni">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">
                {' '}
                <span role="img" aria-label="FISH">
                  🐟
                </span>{' '}
                price:
              </TYPE.white>
              <TYPE.white color="white">${uniPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Uniswap POWER</TYPE.white>
              <TYPE.white color="white">
                {totalSupplyShrimp?.toFixed(0, { groupSeparator: ',' })}{' '}
                <span role="img" aria-label="SHRIMP">
                  🦐
                </span>{' '}
                - ${shrimpPrice?.toFixed(2) ?? '-'} /{' '}
                <span role="img" aria-label="SHRIMP">
                  🦐
                </span>{' '}
              </TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Compound.Finance POWER</TYPE.white>
              <TYPE.white color="white">
                {totalSupplyCrab?.toFixed(0, { groupSeparator: ',' })}
                <span role="img" aria-label="CRAB">
                  🦀
                </span>{' '}
                - ${crabPrice?.toFixed(2) ?? '-'} /{' '}
                <span role="img" aria-label="CRAB">
                  🦀
                </span>{' '}
              </TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">ADAI POWER</TYPE.white>
              <TYPE.white color="white">
                {totalSupplyTori?.toFixed(0, { groupSeparator: ',' })}{' '}
                <span role="img" aria-label="TORI">
                  ⛩
                </span>{' '}
                - ${toriPrice?.toFixed(2) ?? '-'} /{' '}
                <span role="img" aria-label="TORI">
                  ⛩
                </span>{' '}
              </TYPE.white>
            </RowBetween>
            {uni && uni.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://penguinalytics.eth.link/#/token/${uni.address}`}>
                View{' '}
                <span role="img" aria-label="FISH">
                  🐟
                </span>{' '}
                Analytics
              </ExternalLink>
            ) : null}
            {shrimp && shrimp.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://penguinalytics.eth.link/#/token/${shrimp.address}`}>
                View
                <span role="img" aria-label="SHRIMP">
                  🦐
                </span>{' '}
                Analytics
              </ExternalLink>
            ) : null}
            {crab && crab.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://penguinalytics.eth.link/#/token/${crab.address}`}>
                View{' '}
                <span role="img" aria-label="CRAB">
                  🦀
                </span>{' '}
                Analytics
              </ExternalLink>
            ) : null}
            {tori && tori.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://penguinalytics.eth.link/#/token/${tori.address}`}>
                View{' '}
                <span role="img" aria-label="TORI">
                  ⛩
                </span>{' '}
                Analytics
              </ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
