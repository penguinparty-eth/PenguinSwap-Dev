import { ChainId, Currency, CurrencyAmount, ETHER, Token, TokenAmount, WETH } from '@uniswap/sdk'
import { SHRIMP, UNITOKEN} from '../constants/index'

export function wrappedUnicurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === UNITOKEN ? SHRIMP : currency instanceof Token ? currency : undefined
}
export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  if(chainId && currency === ETHER) {
  return WETH[chainId]
}
  if(chainId && currency === UNITOKEN){
  return SHRIMP
}
else {
  if(currency instanceof Token) {
    return currency;
  } else {
    return undefined;
  }
}
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[token.chainId])) return ETHER
  if (token.equals(SHRIMP)) return UNITOKEN
  return token
}
export function unwrappedUniToken(token: Token): Currency {
  if (token.equals(SHRIMP)) return UNITOKEN
  return token
}
