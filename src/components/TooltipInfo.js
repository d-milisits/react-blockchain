import React from 'react'
import { FaInfoCircle } from "react-icons/fa";
import '../styles/TooltipInfo.css';

const TooltipInfo = ({heading, text, type, desc}) => {

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
      <div className="tooltip-info">
         <div className="tt-info-header">
            <h5>{heading}</h5>
            <div className="tt-info-hvr">
               <FaInfoCircle className="hvr" style={{opacity: .4, cursor: 'pointer'}} size={13}/>
               <div className="tooltip-details">
                  <p>{desc}</p>
               </div>
            </div>
         </div>
         {text ? <p style={{color: type === 'percent' ? text < 0 ? 'rgb(244, 93, 72)' : '#078080' : 'inherit'}}>{type === 'percent' ? text < 0 ? '' : '+' : ''}{type === 'dollar' ? '$'+numFormatter(text) : text+'%'}</p> : <p style={{opacity: '.45'}}>Not available</p>}
      </div>
   )
}

export default TooltipInfo
