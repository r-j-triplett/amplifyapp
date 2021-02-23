import React, { Component } from 'react';
import StockList from '../StockList/stocklist.js';

class Ticker extends Component {
  constructor(props) {
    super(props);
    //Default array
    //this.stockArray = [this.props.stock];
    if ((this.props.stock).length > 0) {
      this.state = {
        stocks: [this.props.stock[0]]
      };  
    } else {
      this.state = {
        stocks: []
      };  
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    //Check cookie for saved array to repopulate stockArray
    //this.triggerStockUpdate() ;
  }

  handleClick(e) {
    if(e) e.preventDefault();

  }

  render () {
    return (
      <>
        <StockList stockItems={ this.state.stocks }/>
      </>
    );
  }
}

export default Ticker;