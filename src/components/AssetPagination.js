import React, {useState, useEffect} from 'react'
import '../styles/AssetPagination.css';

const AssetPagination = ({count, setPage}) => {

   const [pages, setPages] = useState([]);

   useEffect(()=>{
      buildNums(count)
   }, [count])

   function buildNums(count) {
      const numArr = [];
      for (var i=0; i < count; i++) {
         numArr.push(
            {
               num: i+1,
               selected: i === 0 ? true : false,
               id: new Date().getTime()
            }
         );
      }
      setPages(numArr);
   }

   function selectNum(num) {
      setPage(num);
      const tempPages = [...pages].map((page) => {
         if (num === page.num) {
            page.selected = true;
         } else {
            page.selected = false;
         }
         return page;
      })  
      setPages(tempPages);
   }

   return (
      <div className="asset-pagination">
         {
            pages.map((num)=>{
               return <p onClick={()=>{selectNum(num.num)}} className={`${num.selected ? 'selected' : ''}`}>{num.num}</p>
            })
         }
      </div>
   )
}

export default AssetPagination
