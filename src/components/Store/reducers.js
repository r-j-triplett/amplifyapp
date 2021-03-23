let stockState = {
  allStocks: [],
  stockpick: ''
};

const reducer = (state = stockState, action) => {
  switch (action.type) {
    case 'STOCK_PICK': return {
      ...state.allStocks,
      stockpick: action.payload.stock
    };
    case 'INITIATE_STOCK_LIST': return {
      allStocks: action.payload.stocklist,
      stockpick: action.payload.stocklist[0]
    }
    case 'UPDATE_STOCK_LIST': 
    state.allStocks[action.payload.id] = action.payload.stock;
    return {
      allStocks: state.allStocks,
      stockpick: action.payload.stock
    }
    default:
      return state;
  }      
};
    
    export default reducer;