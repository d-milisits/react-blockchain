import React from 'react'
import '../styles/CoinRow.css'

const CoinRow = ({coin, symbol}) => {

   // Simple function to return M > 1Million, K < 1Million, B > 1Billion.
   function numFormatter(num) {
      if(num > 999 && num < 1000000){
          return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
      } else if(num > 1000000 && num < 1000000000){
          return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
      } else if(num > 1000000000 && num < 1000000000000){
         return (num/1000000000).toFixed(1) + 'B'; // convert to B for number from > 1 billion 
      } else if(num > 1000000000000){
         return (num/1000000000000).toFixed(1) + 'T'; // convert to T for number from > 1 trillion 
      } else if(num < 900){
          return num; // if value < 1000, nothing to do
      }
  }

   return (
      <div className="coin-row">
         <div className="coin-name">
            <img src={coin.image} alt={coin.name}/>
            <div className="name-symbol">
               <p className="name">{coin.name}</p>
               <p id="symbol" style={{opacity: '.375'}}>{coin.symbol.toUpperCase()}</p>
            </div>
         </div>
         <p className="col">{symbol}{coin?.current_price?.toFixed(2) ?? '??'}</p>
         <p className="col" style={{color: coin.price_change_percentage_24h > 0 ? '#078080' : '#f45d48'}}>{coin?.price_change_percentage_24h > 0 ? '+' : ''}{coin?.price_change_percentage_24h?.toFixed(2) ?? '??'}%</p>
         <p style={{opacity: coin.circulating_supply ? '1' : '.375', fontStyle: coin.circulating_supply ? 'inherit' : 'italic'}} className="col">{numFormatter(coin.circulating_supply) ?? '??'}</p>
         <p style={{opacity: coin.market_cap ? '1' : '.375', fontStyle: coin.market_cap ? 'inherit' : 'italic'}} className="col">{numFormatter(coin.market_cap) ?? '??'}</p>
         <p style={{opacity: coin.total_volume ? '1' : '.375', fontStyle: coin.total_volume ? 'inherit' : 'italic'}} className="col">{numFormatter(coin.total_volume) ?? '??'}</p>
         <button>Graph</button>
         <div className="mobile-prices">
            <p>{symbol}{coin?.current_price?.toFixed(2) ?? '??'}</p>
            <p id="perc-change" style={{color: coin.price_change_percentage_24h > 0 ? '#078080' : '#f45d48'}}>{coin.price_change_percentage_24h > 0 ? '+' : ''}{coin?.price_change_percentage_24h?.toFixed(2) ?? '??'}%</p>
         </div>
      </div>
   )
}

export default CoinRow
