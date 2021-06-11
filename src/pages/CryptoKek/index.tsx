import React from 'react'

// Test token address
const testTokenAddress = '0x30bcd71b8d21fe830e493b30e90befba29de9114'
const cryptoKekLink = `https://keks.app/t/${testTokenAddress}/chart`
// Import CryptoKek iFrame
const cryptoKek = {
  cryptokek: `<iframe src=${cryptoKekLink} width="100%" height="650px" frameborder="0" allowfullscreen="true" scrolling="no" align="center"> </iframe>`
}

// Do magic so that it works in react
function Iframe(props: { iframe: string }) {
  return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />
}

export default function CryptoKek() {
  return (
    <div className="CryptoKek" style={{width: "80%", marginLeft: 100, marginRight: 100, marginBottom: 80, marginTop: 0 }}>
      <Iframe iframe={cryptoKek['cryptokek']} />
    </div>
  )
}
