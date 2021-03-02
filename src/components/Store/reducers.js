let stockState = {
  allStocks: ['AMZN', 'FUV', 'TSLA', 'MEDT'],
  stockpick: 'AMZN'
};

const reducer = (state = stockState, action) => {
  switch (action.type) {
    case 'STOCK_PICK': return {
      ...state.allStocks,
      stockpick: action.payload.stock
    };
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