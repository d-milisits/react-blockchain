import React from 'react';
import Select from './Select';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { FaReact } from "react-icons/fa";

const Header = () => {

   const navigate = useNavigate();

   const { currency, setCurrency } = CryptoState();

   console.log(currency);

   return (
      <div className="header">
         <div style={{display: 'flex', alignItems: 'center'}}>
            <FaReact size={21.5}/>
            <h2 onClick={() => navigate("/")}>react-blockchain</h2>
         </div>
         {/* <select onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
         </select> */}
         <Select currency={currency} setCurrency={setCurrency} />
      </div>
   )
}

export default Header
