import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import '../styles/CoinInfo.css';
import TimelineSelect from './TimelineSelect';
import CoinInfoDetails from './CoinInfoDetails';

const CoinInfo = ({coin}) => {

   const [historicalData, setHistoricalData] = useState();
   const [days, setDays] = useState(1);
   const [currentPerChange, setCurrentPerChange] = useState();

   const { currency, symbol } = CryptoState();

   useEffect(() => {
      const fetchHistoricalData = async () => {
         const {data} = await axios.get(HistoricalChart(coin?.id, days, currency));
         setHistoricalData(data.prices);
      }

      fetchHistoricalData();

      // Sets current percentage change based on current date range selection on the chart.
      days === 1 ? setCurrentPerChange(coin?.market_data?.price_change_percentage_24h_in_currency?.usd) : days === 30 ? setCurrentPerChange(coin?.market_data?.price_change_percentage_30d_in_currency?.usd) : days === 90 ? setCurrentPerChange(coin?.market_data?.price_change_percentage_60d_in_currency?.usd) : setCurrentPerChange(coin?.market_data?.price_change_percentage_1y_in_currency?.usd)
   }, [currency, days, coin]);

   return (
      <div className="coin-info">
         <div className="coin-info-intro">
            <img alt={coin?.id} src={coin?.image?.small}/>
            <h1>{coin?.id?.charAt(0).toUpperCase() + coin?.id?.slice(1)}</h1>
            <h2>({coin?.symbol?.toUpperCase()}/{currency.toUpperCase()})</h2>
         </div>
         <div className="graph-ctr">
            <div className="price-options-ctr">
               <div className="price-percentage-ctr">
                  <h2>{symbol}{coin?.market_data?.current_price?.[currency.toLowerCase()].toFixed(2)}</h2>
                  <h5 style={{color: currentPerChange > 0 ? '#078080' : 'rgb(244, 93, 72)'}}>{currentPerChange > 0 ? '+' : ''}{currentPerChange?.toFixed(2)}%</h5>
               </div>
               {/* BUTTONS TO SELECT FILTER */}
               <div id="timeline-select">
                  {
                     chartDays.map(day => (
                        <TimelineSelect 
                        key={day.value}
                        onClick={()=>{setDays(day.value)}}
                        selected={day.value===days}
                        >{day.label}</TimelineSelect>
                     ))
                  }
               </div>
            </div>
            {
               !historicalData ? <p>LOADING</p>
               :
               //Historical chart
               <>
               <div className="graph">
               <Chart type="line" data={{
                  labels:historicalData.map((coin) => {
                     //Convert into date
                     let date = new Date(coin[0]);
                     //Frontend logic to handle AM/PM
                     let time = date.getHours() > 12 ?
                     `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
                     // Utilize time if within the day, otherwise not relevant.
                     return days === 1 ? time : date.toLocaleDateString()
                  }),
                  datasets: [
                     {
                        data: historicalData.map((coin) => coin[1]),
                     label: `Price (Past ${days} Days) in ${currency}`,
                     borderColor: '#078080'
                  }
                  ],
               }}
               options={{
                  elements: {
                     point: {
                        radius: 1,
                     }
                  }
               }}
               />
               </div>
               <CoinInfoDetails coin={coin}/>
               </>
            }
         </div>
      </div>
   )
}

export default CoinInfo
