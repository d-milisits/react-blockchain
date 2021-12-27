import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import '../styles/CoinInfo.css';
import TooltipInfo from './TooltipInfo';
import { BsGlobe, BsReddit } from "react-icons/bs";

const CoinInfoDetails = ({coin}) => {

   //Object used to pass tooltip descriptions as props.
   const descObj = {
      mCap: 'Crypto market capitalization is the total value of a cryptocurrency. Where stock market capitalization is calculated by multiplying share price times shares outstanding, crypto market capitalization is calculated by multiplying the price of the cryptocurrency with the number of coins in circulation.',
      volume: 'The total dollar value of all transactions for this asset over the past 24 hours.',
      supply: 'Supply shows the number of coins or tokens that have been issued so far. We also show the percent of the maximum supply that has already been issued, if applicable.',
      pcHr: 'The percent change in trading volume for this asset compared to 1 hour ago.',
      pcDay: 'The percent change in trading volume for this asset compared to 1 day ago.',
      pcWeek: 'The percent change in trading volume for this asset compared to 1 week ago.'
   }

   return (
      <>
      <div className="coin-info-details">
         <h3>Market Statistics</h3>
         <div className="coin-info-row">
            <TooltipInfo heading="Market Cap" text={coin?.market_data?.market_cap?.usd} type='dollar' desc={descObj.mCap}/>
            <TooltipInfo heading="Volume (24H)" text={coin?.market_data?.total_volume?.usd} type='dollar' desc={descObj.volume}/>
            <TooltipInfo heading="Total Supply" text={coin?.market_data?.total_supply} type='dollar' desc={descObj.supply}/>
         </div>
         <div className="coin-info-row">
            <TooltipInfo heading="Percent Change (1h)" text={coin?.market_data?.price_change_percentage_1h_in_currency?.usd} type='percent' desc={descObj.pcHr}/>
            <TooltipInfo heading="Percent Change (24h)" text={coin?.market_data?.price_change_percentage_24h_in_currency?.usd} type='percent' desc={descObj.pcDay}/>
            <TooltipInfo heading="Percent Change (7d)" text={coin?.market_data?.price_change_percentage_7d_in_currency?.usd} type='percent' desc={descObj.pcWeek}/>
         </div>
         <h3>About This Coin</h3>
         <a style={{opacity: coin?.links?.homepage ? '1' : '.45'}} href={coin?.links?.homepage?.[0]} target="_blank">
            <div className="link">
               <BsGlobe size={20} style={{opacity: '.55'}} />
               <p>Official Website</p>
            </div>
         </a>
         <a href={coin?.links?.subreddit_url} target="_blank">
            <div className="link" style={{opacity: coin?.links?.subreddit_url ? '1' : '.25'}}>
               <BsReddit size={20} style={{opacity: '.55'}} />
               <p>Official Sub-Reddit</p>
            </div>
         </a>
         {coin?.description?.en ? <p id="desc">{ReactHtmlParser(coin?.description?.en)}</p> : <p id="desc" style={{opacity: '.45'}}>No description available.</p>}
      </div>
      </>
   )
}

export default CoinInfoDetails
