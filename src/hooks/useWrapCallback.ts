import { Currency, currencyEquals, ETHER, WETH } from '@uniswap/sdk'
import { useMemo } from 'react'
import { tryParseAmount } from '../state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useActiveWeb3React } from './index'
import { useWETHContract, useWUNIContract, useUniContract, useWCOMPContract,
   useCOMPContract, useTORIContract, useADAIContract, useCOMMONWEALTHContract, useTokenContract } from './useContract'
import { SHRIMP, UNITOKEN, CRAB, COMP, TORI, ADAI, COMMONWEALTH, FISH, DAI, ADAITWO, XETH} from '../constants/index'
import { MaxUint256 } from '@ethersproject/constants'
const BN = require('bn.js')


export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP
}
const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { chainId, account } = useActiveWeb3React()
  const wethContract = useWETHContract()
  const wuniContract = useWUNIContract()
  const uniContract = useUniContract()
  const crabContract = useWCOMPContract()
  const compContract = useCOMPContract()
  const toriContract = useTORIContract()
  const adaiContract = useADAIContract()
  const adaiv2Contract = useTokenContract(ADAITWO.address)
  const commonwealthContract = useCOMMONWEALTHContract()
  const fishContract = useTokenContract(FISH.address)
  const daiContract = useTokenContract(DAI.address)
  const xethContract = useTokenContract(XETH.address)
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  const ourTokens = wethContract || wuniContract || crabContract
  return useMemo(() => {
    if (!ourTokens || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency === ETHER && currencyEquals(WETH[chainId], outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.deposit({ value: `0x${inputAmount.raw.toString(16)}` })
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} ETH to WETH` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else if (currencyEquals(WETH[chainId], inputCurrency) && outputCurrency === ETHER) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} WETH to ETH` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient WETH balance'
      }
    }
    if (inputCurrency === ETHER && currencyEquals(XETH, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await xethContract.deposit({ value: `0x${inputAmount.raw.toString(16)}` })
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} ETH to WETH` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else if (currencyEquals(XETH, inputCurrency) && outputCurrency === ETHER) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await xethContract.withdraw(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} WETH to ETH` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient WETH balance'
      }
    }
    else if (currencyEquals(inputCurrency,UNITOKEN) && currencyEquals(SHRIMP, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await uniContract.allowance(account,SHRIMP.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await uniContract.approve(SHRIMP.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} Uni to 🦐` })
                  }
                  const txReceipt = await wuniContract.wrap(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} Uni to 🦐` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient UNI balance'
      }
    } else if (currencyEquals(SHRIMP, inputCurrency) && currencyEquals(outputCurrency,UNITOKEN)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await wuniContract.unwrap(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 🦐 to UNI` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 🦐 balance'
      }
    }
    else if (currencyEquals(inputCurrency,COMP) && currencyEquals(CRAB, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await uniContract.allowance(account,CRAB.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await compContract.approve(CRAB.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} COMP to 🦀` })
                  }
                  const txReceipt = await crabContract.wrap(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} COMP to 🦀` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient COMP balance'
      }
    } else if (currencyEquals(SHRIMP, inputCurrency) && currencyEquals(outputCurrency,UNITOKEN)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await crabContract.unwrap(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 🦀 to COMP` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 🦀 balance'
      }
    }
    else if (currencyEquals(inputCurrency,ADAI) && currencyEquals(TORI, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await adaiContract.allowance(account,TORI.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await adaiContract.approve(TORI.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} ADAI to ⛩️` })
                  }
                  const txReceipt = await toriContract.wrap(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} ADAI to ⛩️` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ADAI balance'
      }
    } else if (currencyEquals(TORI, inputCurrency) && currencyEquals(outputCurrency,ADAI)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await toriContract.unwrap(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} ⛩️ to ADAI` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ⛩ balance'
      }
    }
    else if (currencyEquals(inputCurrency,ADAI) && currencyEquals(COMMONWEALTH, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await adaiContract.allowance(account,COMMONWEALTH.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await adaiContract.approve(COMMONWEALTH.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} ADAI to 👈⛩️👉` })
                  }
                  const txReceipt = await commonwealthContract.wrap(`0x${inputAmount.raw.toString(16)}`,1)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} ADAI to 👈⛩️👉` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient aDAI balance'
      }
    } else if (currencyEquals(COMMONWEALTH, inputCurrency) && currencyEquals(outputCurrency,ADAI)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await commonwealthContract.unwrap(`0x${inputAmount.raw.toString(16)}`,1)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 👈⛩️👉 to ADAI` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 👈⛩️👉 balance'
      }
    }
    else if (currencyEquals(inputCurrency,FISH) && currencyEquals(COMMONWEALTH, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await fishContract.allowance(account,COMMONWEALTH.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await fishContract.approve(COMMONWEALTH.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} 🐟 to 👈⛩️👉` })
                  }
                  const txReceipt = await commonwealthContract.wrap(`0x${inputAmount.raw.toString(16)}`,0)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} 🐟 to 👈⛩️👉` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 🐟 balance'
      }
    } else if (currencyEquals(COMMONWEALTH, inputCurrency) && currencyEquals(outputCurrency,FISH)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await commonwealthContract.unwrap(`0x${inputAmount.raw.toString(16)}`,0)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 👈⛩️👉 to 🐟` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 👈⛩️👉 balance'
      }
    }
    else if (currencyEquals(inputCurrency,TORI) && currencyEquals(COMMONWEALTH, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await toriContract.allowance(account,COMMONWEALTH.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await toriContract.approve(COMMONWEALTH.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} ⛩️ to 👈⛩️👉` })
                  }
                  const txReceipt = await commonwealthContract.wrap(`0x${inputAmount.raw.toString(16)}`,2)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} ⛩️ to 👈⛩️👉` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ⛩️ balance'
      }
    } else if (currencyEquals(COMMONWEALTH, inputCurrency) && currencyEquals(outputCurrency,TORI)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await commonwealthContract.unwrap(`0x${inputAmount.raw.toString(16)}`,2)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 👈⛩️👉 to ⛩️` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 👈⛩️👉 balance'
      }
    }
    else if (currencyEquals(inputCurrency,ADAITWO) && currencyEquals(COMMONWEALTH, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await adaiv2Contract.allowance(account,COMMONWEALTH.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await adaiv2Contract.approve(COMMONWEALTH.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} aDAI-V2 to 👈⛩️👉` })
                  }
                  const txReceipt = await commonwealthContract.wrap(`0x${inputAmount.raw.toString(16)}`,3)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} aDAI-V2 to 👈⛩️👉` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient aDAI-V2 balance'
      }
    } else if (currencyEquals(COMMONWEALTH, inputCurrency) && currencyEquals(outputCurrency,ADAITWO)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await commonwealthContract.unwrap(`0x${inputAmount.raw.toString(16)}`,3)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 👈⛩️👉 to aDAI-V2` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 👈⛩️👉 balance'
      }
    }
    else if (currencyEquals(inputCurrency,DAI) && currencyEquals(COMMONWEALTH, outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if((await daiContract.allowance(account,COMMONWEALTH.address)).lte(new BN(inputAmount.raw.toString(16), 16))){
                    const txReceipt1 = await daiContract.approve(COMMONWEALTH.address,MaxUint256)
                    addTransaction(txReceipt1, { summary: `Approve ${inputAmount.toSignificant(6)} aDAI-V2 to 👈⛩️👉` })
                  }
                  const txReceipt = await commonwealthContract.wrap(`0x${inputAmount.raw.toString(16)}`,5)
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} aDAI-V2 to 👈⛩️👉` })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient aDAI-V2 balance'
      }
    } else if (currencyEquals(COMMONWEALTH, inputCurrency) && currencyEquals(outputCurrency,DAI)) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await commonwealthContract.unwrap(`0x${inputAmount.raw.toString(16)}`,5)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} 👈⛩️👉 to aDAI-V2` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient 👈⛩️👉 balance'
      }
    }
     else {
      return NOT_APPLICABLE
    }
  }, [wethContract, wuniContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction])
}
