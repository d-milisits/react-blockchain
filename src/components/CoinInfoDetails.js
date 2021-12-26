import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import '../styles/CoinInfo.css';
import TooltipInfo from './TooltipInfo';
import { BsGlobe, BsReddit } from "react-icons/bs";

const CoinInfoDetails = ({coin}) => {
   return (
      <>
      <div className="coin-info-details">
         <h3>Market Statistics</h3>
         <div className="coin-info-row">
            <TooltipInfo heading="Market Cap" text={coin?.market_data?.market_cap?.usd} type='dollar'/>
            <TooltipInfo heading="Volume (24H)" text={coin?.market_data?.total_volume?.usd} type='dollar'/>
            <TooltipInfo heading="Total Supply" text={coin?.market_data?.total_supply} type='dollar'/>
         </div>
         <div className="coin-info-row">
            <TooltipInfo heading="Percent Change (1h)" text={coin?.market_data?.price_change_percentage_1h_in_currency?.usd} type='percent'/>
            <TooltipInfo heading="Percent Change (24h)" text={coin?.market_data?.price_change_percentage_24h_in_currency?.usd} type='percent'/>
            <TooltipInfo heading="Percent Change (7d)" text={coin?.market_data?.price_change_percentage_7d_in_currency?.usd} type='percent'/>
         </div>
         <h3>About This Coin</h3>
         <div className="link">
            <BsGlobe size={20}  style={{opacity: '.55'}} />
            <p>Official Website</p>
         </div>
         <div className="link">
            <BsReddit size={20} style={{opacity: '.55'}} />
            <p>Official Sub-Reddit</p>
         </div>
         {coin?.description?.en ? <p id="desc">{ReactHtmlParser(coin?.description?.en)}</p> : <p id="desc" style={{opacity: '.45'}}>No description available.</p>}
      </div>
      </>
   )
}

export default CoinInfoDetails
