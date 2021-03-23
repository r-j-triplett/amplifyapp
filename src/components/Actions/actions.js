
export const addStockList = (data) => ({
  type: "UPDATE_STOCK_LIST",
  payload : {
    id: data.id,
    stock: data.stock
  }
})

export const initStockList = (data) => ({
  type: "INITIATE_STOCK_LIST",
  payload : {
    stocklist: data.stocklist
  }
})

export const addStock = (data) => ({
  type: "STOCK_PICK",
  payload : {
    stock: data.stock
  }
})