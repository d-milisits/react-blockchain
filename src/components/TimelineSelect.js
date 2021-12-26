import React from 'react'

const TimelineSelect = ({children, selected, onClick}) => {

   //Hacky way of handling re-assigning CoinGeko labelnames.
   let label = children;
   if (children === '24 Hours') label = '24H';
   else if (children === '30 Days') label = '1M';
   else if (children === '3 Months') label = '3M';
   else label = '1Y';

   return (
      <span style={{color: selected ? 'rgb(244, 93, 72)' : 'inherit'}} onClick={onClick}>{label}</span>
   )
}

export default TimelineSelect
