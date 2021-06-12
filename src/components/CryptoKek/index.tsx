import React from 'react'
import { Currency, Token, WETH } from '@uniswap/sdk/dist/index'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'

export default function CryptoKek() {
  let testTokenAddress = '0x30bcd71b8d21fe830e493b30e90befba29de9114'
  const { currencies } = useDerivedSwapInfo()
  var input = currencies[Field.INPUT]
  var output = currencies[Field.OUTPUT]
  console.log({ input, output })
  if (input?.symbol == Currency.ETHER.symbol) {
    //WETH[1] should be WETH[current chain ID]
    input = WETH[1]
  }
  if (output?.symbol == Currency.ETHER.symbol) {
    output = WETH[1]
  }
  if (input instanceof Token) {
    console.log('input address: ', input.address)
  }
  if (output instanceof Token) {
    testTokenAddress = output.address
  }

  // Test token address and link to the CryptoKekiFrame
  
  const CRYPTO_KEK_LINK = `https://keks.app/t/${testTokenAddress}/chart`
  console.log(CRYPTO_KEK_LINK)
  
  // CryptoKek iFrame
  const CRYPTO_KEK_IFRAME = `<iframe src=${CRYPTO_KEK_LINK} width="100%" height="650px" frameborder="0" allowfullscreen="true" scrolling="no"> </iframe>`

  // Do magic so that it works in react
  function Iframe(props: { iframe: string }) {
    return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />
  }

  return (
    <div className="CryptoKek" style={{ width: '80%' , marginLeft: 100, marginRight: 100, marginBottom: 80, marginTop: 0}}>
      <Iframe iframe={CRYPTO_KEK_IFRAME} />
    </div>
  )
}
