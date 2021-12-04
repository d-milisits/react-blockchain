import React, {useState} from 'react'
import { BsFillCaretDownFill } from "react-icons/bs";
import '../styles/Select.css';

const Select = ({currency, setCurrency}) => {

   // Bool to toggle select options.
   const [showOptions, setShowOptions] = useState(false);

   return (
      <div onClick={()=>{setShowOptions(!showOptions)}} className="select">
         <div className={`select-options ${showOptions ? 'active' : ''}`}>
            <p onClick={()=>{setCurrency("USD")}}>USD</p>
            <p onClick={()=>{setCurrency("EUR")}}>EUR</p>
            <p onClick={()=>{setCurrency("INR")}}>INR</p>
         </div>
         <p>{currency}</p>
         <BsFillCaretDownFill style={{fill: '#222525'}}/>
      </div>
   )
}

export default Select
