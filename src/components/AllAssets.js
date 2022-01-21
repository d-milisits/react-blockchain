import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import '../styles/AllAssets.css';
import CoinRow from './CoinRow';
import { FaSearch } from "react-icons/fa";
import AssetPagination from './AssetPagination';

const AllAssets = ({loading}) => {

   // All Coins
   const [coins, setCoins] = useState([]);
   // Filter state (Option)
   const [filterOption, setFilterOption] = useState('All');
   // Coin Categories (Gainers/Losers);
   const [coinCatOption, setCoinCatOption] = useState([]);
   // Filter state
   const [search, setSearch] = useState('');
   // Pagination State
   const [page, setPage] = useState(1);
   
   const navigate = useNavigate();

   const { currency, symbol } = CryptoState();

   useEffect(() => {

      const fetchCoins = async () => {
         //Destructure on load, as data will contain data in itself (data.data).
         const { data } = await axios.get(CoinList(currency));
         setCoins(data);
         setCoinCatOption(data);
      }

      fetchCoins();
   }, [currency]);

   // Search & filter by currency name or symbol.
   const handleSearch = () => {
      return coinCatOption.filter((coin) => 
         coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
      )
   }

   // Coin Categories (Gainers/Losers);
   function changeCoinCategory(category) {
      if (category === 'Gainers') {
         setFilterOption("Gainers");
         setCoinCatOption(coins.filter(coin => coin.price_change_percentage_24h > 0).sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h));
      } else if (category === 'Losers') {
         setFilterOption("Losers");
         setCoinCatOption(coins.filter(coin => coin.price_change_percentage_24h < 0).sort((a,b) => a.price_change_percentage_24h - b.price_change_percentage_24h));
      } else {
         setFilterOption("All");
         setCoinCatOption(coins);
      }
   }

   //List of column objects used to display column IDs and sort.
   const [colNamObj, setColNamObj] = useState([
      {
         title: 'PRICE',
         order: 'desc',
         apiKey: 'current_price'
      },
      {
         title: '% CHANGE',
         order: 'desc',
         apiKey: 'price_change_percentage_24h'
      },
      {
         title: 'SUPPLY',
         order: 'desc',
         apiKey: 'circulating_supply'
      },
      {
         title: 'MKT. CAP',
         order: 'desc',
         apiKey: 'market_cap'
      },
      {
         title: 'VOLUME',
         order: 'desc',
         apiKey: 'total_volume'
      }
   ])

   function sortByCoinCategory(obj) {
      const tempArr = handleSearch().sort((a, b) => obj.order === 'asc' ? (a[obj.apiKey] - b[obj.apiKey]) : (b[obj.apiKey] - a[obj.apiKey]));
      setCoinCatOption(tempArr);
      // Change order after sort code is executed.
      setColNamObj(
         [...colNamObj].map((item) => {
            if (item === obj) {
               console.log(item);
               item.order === 'desc' ? item.order = 'asc' : item.order = 'desc';
            }
            return item
         })
      );
   }

   return (
      !loading ? 
      <div className="assets-loaded">
      <div className="all-assets-options-ctr">
         <div className="all-assets-options">
            <div onClick={()=>{changeCoinCategory('All')}}  className={`option ${filterOption === 'All' ? 'active' : ''}`}>
               All Assets
            </div>
            <div  onClick={()=>{changeCoinCategory('Gainers')}} className={`option ${filterOption === 'Gainers' ? 'active' : ''}`}>
               Gainers
            </div>
            <div onClick={()=>{changeCoinCategory('Losers')}} className={`option ${filterOption === 'Losers' ? 'active' : ''}`}>
               Losers
            </div>
         </div>
         <div className="all-assets-search">
            <FaSearch size={15} style={{opacity: '.25'}}/>
            <input value={search} onChange={(e)=>{setPage(1); setSearch(e.target.value)}} placeholder="Search for any asset..."/>
         </div>
      </div>
      <div className="all-assets" id="all-assets">
         <div className="all-assets-labels">
            <div className="name">
               <p>NAME</p>
            </div>
            {
               colNamObj.map(obj => {
                  return <div onClick={()=>{sortByCoinCategory(obj)}} className="col"><p>{obj.title}</p></div>
               })
            }
            <div style={{width: '73.08px', marginLeft: '25px'}}>
            </div>
         </div>
         {
            handleSearch().length ? handleSearch().slice((page-1) * 15, (page-1) * 15 + 15).map((coin) => {
               return <div key={coin.id} onClick={() => navigate(`/coins/${coin.id}`)}><CoinRow key={coin.name} coin={coin} symbol={symbol}/></div>
            }) : 
            <div className="no-assets">
            <p>No results for "{search}"</p>
            <button onClick={()=>setSearch('')}>Clear Search</button>
            </div>
         }
      </div>
      <AssetPagination count={handleSearch().length/15} setPage={setPage}/>
      </div>
      :
      null
   )
}

export default AllAssets
