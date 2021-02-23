import React from 'react';
import StockListItem from '../StockListItem/stocklistitem.js';
import './stocklist.css';


const StockList = (props) => {

  const stockItem = props.stockItems.map((stock) => {
    
      return (
        <StockListItem key={ stock.symbol }
                       symbol={ stock.symbol }
                       price={ stock.price }
                       volume={ stock.volume }
                       open={ stock.open }
                       high={ stock.high }
                       low={ stock.low } />
      );
  });

  return (
    <>
      { stockItem }
    </>
  )
}

export default StockList;