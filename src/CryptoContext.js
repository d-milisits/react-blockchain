import React, { createContext, useContext, useState, useEffect } from 'react'

const Crypto = createContext();

const CryptoContext = ({children}) => {

   const [currency, setCurrency] = useState("USD");
   const [symbol, setSymbol] = useState("$");

   // If currency changes, re-set symbol.
   useEffect(() => {
      if (currency === "USD") setSymbol("$");
      else if (currency === "EUR") setSymbol("€");
      else setSymbol("₹");
   }, [currency]);

   return (
      <Crypto.Provider value={{currency, symbol, setCurrency}}>
         {children}
      </Crypto.Provider>
   )
}

export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crypto);
}