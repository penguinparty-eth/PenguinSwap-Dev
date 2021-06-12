import React from 'react'

// Test token address and link to the CryptoKekiFrame
let testTokenAddress = '0x30bcd71b8d21fe830e493b30e90befba29de9114'
const CRYPTO_KEK_LINK = `https://keks.app/t/${testTokenAddress}/chart`
// CryptoKek iFrame
const CRYPTO_KEK_IFRAME = `<iframe src=${CRYPTO_KEK_LINK} width="100%" height="650px" frameborder="0" allowfullscreen="true" scrolling="no" marginLeft: 100, marginRight: 100, marginBottom: 80, marginTop: 0 "> </iframe>`

// Do magic so that it works in react
function Iframe(props: { iframe: string }) {
  return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />
}

export default function CryptoKek() {
  return (
    <div className="CryptoKek" style={{width: "80%"}}>
      <Iframe iframe={CRYPTO_KEK_IFRAME} />
    </div>
  )
}
