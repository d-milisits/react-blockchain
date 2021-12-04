import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/Trending.css';
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'

const Trending = () => {

   const [trending, setTrending] = useState([]);

   const { currency } = CryptoState();

   const fetchTrendingCoins = async () => {
      const {data} = await axios.get(TrendingCoins(currency));
      setTrending(data);
   }

   useEffect(() => {
      fetchTrendingCoins();
   }, [currency])

   return (
      <div className="trending">
         {
            trending.slice(0, 5).map((item, index) => {
               return <div key={item.id} className="trending-item">
                  <h3>#{index+1} Trending</h3>
                  <img src={item.image} alt={item.id}/>
                  <h2>{item.name}</h2>
                  <p><span style={{color: item.price_change_percentage_24h > 0 ? '#078080' : '#f45d48'}}>{item.price_change_percentage_24h > 0 ? '+' : ''}{item.price_change_percentage_24h.toFixed(2)}%</span> 24h change</p>
               </div>
            })
         }
      </div>
   )
}

export default Trending
