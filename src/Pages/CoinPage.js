import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import CoinInfo from '../components/CoinInfo';
import Loader from '../components/Loader';
import { SingleCoin } from '../config/api';

const CoinPage = () => {

   // Used to get coin ID from search URL.
   const { id } = useParams();
   const [coin, setCoin] = useState();

   const [loading, setLoading] = useState(true);

   useEffect(() => {

      const fetchCoin = async () => {
         const { data } = await axios.get(SingleCoin(id));
         setCoin(data);
         setLoading(false);
      }

      fetchCoin();
      
   }, [id])

   return (
      !loading ? 
      <>
      <CoinInfo coin={coin}/>
      </>
      :
      <Loader/>
   )
}

export default CoinPage
