import React from 'react'
import styled from 'styled-components'
import PinkLogo from '../../../src/assets/svg/logo_pink.svg'
import './style.css'
import { PENGUIN_URLS, KEK, ISLA, VERSION } from '../../constants'
// Import the required images
import CryptokekLogo from '../../assets/images/penguinparty/cryptokek.png'
import HiturunkSelfie from '../../../src/assets/images/penguinparty/hiturunk.jpg'
import DefiVille from '../../../src/assets/images/penguinparty/defiville.svg'
import PenguinClouds from '../../../src/assets/images/penguinparty/penguinclouds.gif'

export default function ShowTeamPage() {
  const PenguinParty = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: -2%;
    width: 70%
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5% 5% 0% 0%;
  `
  const AboutText = styled.div`
    align-self: center;
    color: white;
    margin: 5%;
    padding: 2%;
  `
  const PenguinArea = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    width: 70%;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0% 0% 5% 5%;
  `
  const Hiturunk = styled.div`
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    align-items: center;
    margin-bottom: 5%;
  `
  const Devs = styled.div`
    background-position: cover;
    color: white;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-wrap: wrap;
    place-items: center;
    text-align: center;
    margin: 0 auto;
  `
  const Partners = styled.div`
    background-position: cover;
    color: white;
    text-align: center;
    margin: 0 auto;
    display: grid;
    flex-direction: column;
    padding-bottom: 5%;
    padding-top: 5%;
  `

  const KEKTRADE = PENGUIN_URLS.home.concat(KEK.address)
  const ISLATRADE = PENGUIN_URLS.home.concat(ISLA.address)
  const VERSION_TEXT = 'Version '.concat(VERSION)

  return (
    <>
      <PenguinParty className="penguin-party">
        <img width={'20%'} height={'20%'} src={PenguinClouds} alt="logo" style={{ margin: '8%', paddingLeft: '2%' }} />
        <AboutText>
          <h1>ABOUT</h1>
          <b>Penguin Party</b> is a Decentralized Governance Token Delegation focused on software deliverables to
          improve decentralized protocols and ensure protocol interoperability.
          <br></br>
          <br></br>
          <b>Penguin Swap</b> is our front-end interface which interacts with the Uniswap trading Protocol contracts
          using Penguin Swap's preferred token list and custom token / routing pairs.
          <br></br>
          <br></br>
          <sup>Made at PanArka Blockchain Laboratories, Inc. - A Delaware Corporation.</sup>
        </AboutText>
      </PenguinParty>
      <PenguinArea>
        <Hiturunk>
          <h2>The 🐧 Team</h2>
          <br></br>
          <img className="hiturunk" src={HiturunkSelfie} alt="" />
          <h3>Hiturunk</h3>
          Senior Developer / CEO
        </Hiturunk>
        <Devs className="devs">
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>Dwi</h3>
            CTO/Sr. Dev.
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>Pancake</h3>
            Sr. Dev.
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>Pooryia</h3>
            Graphic Designer
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>Davey</h3>
            Statistics Modelling
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>FerretKnows</h3>
            Jr. Dev.
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>AnimalHut</h3>
            Infrastructure
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>Summer</h3>
            HR
          </div>
          <div className="dev">
            <img className="team-photo" src={PinkLogo} alt="" />
            <h3>Brute4</h3>
            Marketing
          </div>
        </Devs>
        <Partners>
          <h2>Our 🐧 Partners</h2>
          <div className="crypto-kek-div">
            <a href="https://cryptokek.com/">
              <img className="crypto-kek-pic" src={CryptokekLogo} alt="" />
            </a>
            <br></br>
            CryptoKek is an analytics platform for decentralized exchanges designed to offer cutting edge insight to
            support its users in their endeavors.
            <div className="trade-kek">
              <h3>
                <a href={KEKTRADE}>Trade</a>
              </h3>
            </div>
          </div>
          <div className="defiville-div">
            <a href="https://defiville.finance/">
              <img className="defiville-pic" src={DefiVille} alt="" />
            </a>
            <br></br>
            Defiville is a 100% community-led gamified social experiment focused on incentivizing participation in
            yield-farming protocols.
            <div className="trade-defi">
              <h3>
                <a href={ISLATRADE}>Trade</a>
              </h3>
            </div>
          </div>
        </Partners>
        {VERSION_TEXT}
      </PenguinArea>
    </>
  )
}
