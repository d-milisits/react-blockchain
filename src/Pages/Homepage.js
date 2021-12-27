import React, {useState} from 'react'
import AllAssets from '../components/AllAssets'
import Banner from '../components/Banner/Banner'

const Homepage = () => {

   const [loading, setLoading] = useState(true);

   return (
      <div>
         <Banner loading={loading} setLoading={setLoading} />
         <AllAssets loading={loading} />
      </div>
   )
}

export default Homepage
