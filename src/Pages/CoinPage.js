import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import CallToAction from '../components/CallToAction';
import CoinInfo from '../components/CoinInfo';
import Loader from '../components/Loader';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinPage = () => {

   // Used to get coin ID from search URL.
   const { id } = useParams();
   const [coin, setCoin] = useState();

   const [loading, setLoading] = useState(true);

   const {currency, symbol} = CryptoState();

   console.log(coin);

   const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setLoading(false);
   }

   useEffect(() => {
      fetchCoin();
   }, [])

   return (
      !loading ? 
      <>
      <CoinInfo coin={coin}/>
      {/* <CallToAction/> */}
      </>
      :
      <Loader/>
   )
}

export default CoinPage
