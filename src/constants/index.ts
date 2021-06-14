import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'

export const ROUTER_ADDRESS = '0xc9F8878ebBA65Ab04743f374f57fB652981e222c'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export { PRELOADED_PROPOSALS } from './proposals'
// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}
export const VERSION = "5.8.5"
export const DEFAULTTOKEN = '0x30bcd71b8d21fe830e493b30e90befba29de9114'
export const FISH = new Token(ChainId.MAINNET, '0x30bcd71b8d21fe830e493b30e90befba29de9114', 18, '🐟', 'Penguin Party Fish')
export const CRAB = new Token(ChainId.MAINNET, '0x8669fA2B06829aa5FaBC47b5E5d0e66b85F1522E', 18, '🦀', 'Penguin Party Crab')
export const SHRIMP = new Token(ChainId.MAINNET, '0x5a43589fe110bb355ba4a90a9c01476d87e68de8', 18, '🦐', 'Penguin Party Shrimp')
export const TORI = new Token(ChainId.MAINNET, '0x26780078e07cc33f0323df626f42fa92971561d4', 18, '⛩️', 'Penguin Party Tori')
export const ISLA = new Token(ChainId.MAINNET, '0x20a68f9e34076b2dc15ce726d7eebb83b694702d', 18,  'ISLA', 'Defiville Island Token (defiville.finance)')
export const SAREN = new Token(ChainId.MAINNET, '0xbd4a858139b155219e2c8d10135003fdef720b6b', 18,  'SAREN', 'Saren Token')
export const KEK = new Token(ChainId.MAINNET, '0x3fa400483487A489EC9b1dB29C4129063EEC4654', 18,  'KEK', 'Cryptokek.com')
export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')
export const AUSDC = new Token(ChainId.MAINNET, '0x9bA00D6856a4eDF4665BcA2C2309936572473B7E', 18, 'aUSDC', 'Aave Interest bearing USDC')
export const ADAITWO = new Token(ChainId.MAINNET, '0x028171bca77440897b824ca71d1c56cac55b68a3', 18, 'aDAI-V2', 'V2 - Aave Interest bearing DAI')
export const UNITOKEN = new Token(ChainId.MAINNET, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI', 'Uniswap Token')
export const BUIDL = new Token(ChainId.MAINNET, '0x7b123f53421b1bF8533339BFBdc7C98aA94163db', 18, 'BUIDL', 'DFOHub BUIDL')
export const ADAI = new Token(ChainId.MAINNET, '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d', 18, 'aDAI', 'Aave Interest bearing DAI')
export const AETH = new Token(ChainId.MAINNET, '0x3a3A65aAb0dd2A17E3F1947bA16138cd37d08c04', 18, 'aETH', 'Aave Interest bearing ETH')
export const LINK = new Token(ChainId.MAINNET, '0x514910771AF9Ca656af840dff83E8264EcF986CA', 18, 'LINK', 'ChainLink Token')
export const SOCKS = new Token(ChainId.MAINNET, '0x23b608675a2b2fb1890d3abbd85c5775c51691d5', 18, '🧦', 'Uniswap SOCKS')
export const DFOUSD = new Token(ChainId.MAINNET, '0x44086035439e676c02d411880fccb9837ce37c57', 18, 'uSD', 'DFOHub StableDollar')
export const ZEROXBTC = new Token(ChainId.MAINNET, '0xb6ed7644c69416d67b522e20bc294a9a9b405b31', 18, '0xBTC', '0xBitcoin')
export const JRT = new Token(ChainId.MAINNET, '0x8a9c67fee641579deba04928c4bc45f66e26343a', 18, 'JRT', 'Jarvis Reward Token')
export const MEME = new Token(ChainId.MAINNET, '0xd5525d397898e5502075ea5e830d8914f6f0affe', 8,  'MEME', 'MEME (dontbuymeme.com)')
export const YTSLA = new Token(ChainId.MAINNET, '0x5322a3556f979ce2180b30e689a9436fddcb1021', 18,  'yTSLA', 'yTSLA')
export const BEANS = new Token(ChainId.MAINNET, '0x801f90f81786dc72b4b9d51ab613fbe99e5e4ccd', 18,  'BEANS', 'Happyfarm BEANS')
export const BAO = new Token(ChainId.MAINNET, '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1', 18,  'BAO', 'BAO (bao.finance)')
export const ONEINCH = new Token(ChainId.MAINNET, '0x111111111117dc0aa78b770fa6a738034120c302', 18,  'BAO', '1INCH (1inch.exchange)')


// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, 'UNI', 'Uniswap')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET],DAI,USDC,WBTC,FISH,UNITOKEN,CRAB,SHRIMP,LINK,BUIDL,TORI,MKR,SOCKS,DFOUSD,JRT,KEK,MEME,YTSLA,ISLA,SAREN]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [FISH,UNITOKEN,CRAB,SHRIMP,TORI,ISLA,KEK]
}

// used to construct the list of all pairs we consider by default in the frontend 
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET],DAI,USDC,COMP,WBTC,FISH,UNITOKEN,CRAB,SHRIMP,LINK,BUIDL,TORI,MKR,SOCKS,DFOUSD,KEK,MEME, YTSLA, ONEINCH, ISLA,SAREN]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 300
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(9900), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(9900), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(1000), JSBI.BigInt(10000))
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(1000), JSBI.BigInt(10000))
export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// URLs for the PenguinParty
export const PENGUIN_URLS = {
  home : "https://penguinswap.eth.link/#/swap?outputCurrency=",
  saren : "https://saren.io",
  medium : "https://hiturunk.medium.com",
  github : "https://github.com/penguinparty-eth",
  discord : "https://discord.gg/pkmBgQr",
  treasury: "https://gnosis-safe.io/app/#/safes/0x686B4535FF6573cef3FF37419A4fc6Ac775Ec7ea/balances",
  voting: "https://snapshot.page/#/penguin-party",
  analytics: "https://penguinalytics.eth.link/",
}
