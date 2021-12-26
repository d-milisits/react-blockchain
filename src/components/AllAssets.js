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

   const { currency } = CryptoState();

   const fetchCoins = async () => {
      //Destructure on load, as data will contain data in itself (data.data).
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setCoinCatOption(data);
      console.log(data);
   }

   useEffect(() => {
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
         setCoinCatOption(coins.filter(coin => coin.price_change_percentage_24h > 0));
      } else if (category === 'Losers') {
         setFilterOption("Losers");
         setCoinCatOption(coins.filter(coin => coin.price_change_percentage_24h < 0));
      } else {
         setFilterOption("All");
         setCoinCatOption(coins);
      }
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
            <input onChange={(e)=>{setPage(1); setSearch(e.target.value)}} placeholder="Search for any asset..."/>
         </div>
      </div>
      <div className="all-assets">
         <div className="all-assets-labels">
            <div className="name">
               <p>NAME</p>
            </div>
            <div className="col">
               <p>PRICE</p>
            </div>
            <div className="col">
               <p>% CHANGE</p>
            </div>
            <div className="col">
               <p>SUPPLY</p>
            </div>
            <div className="col">
               <p>MKT. CAP</p>
            </div>
            <div className="col">
               <p>VOLUME</p>
            </div>
         </div>
         {
            handleSearch().slice((page-1) * 15, (page-1) * 15 + 15).map((coin, index) => {
               return <div onClick={() => navigate(`/coins/${coin.id}`)}><CoinRow key={coin.name} coin={coin}/></div>
            })
         }
      </div>
      <AssetPagination count={handleSearch().length/15} setPage={setPage}/>
      </div>
      :
      null
   )
}

export default AllAssets
