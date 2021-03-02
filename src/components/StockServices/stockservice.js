import React from 'react'
import clsx from 'clsx';
import { connect } from 'react-redux'
import { addStockList, addStock } from '../Actions/actions'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  inputLook: {
    position: 'absolute',
    textTransform: 'uppercase',
    top: 3,
    right: 37,
    width: 165,
    height: 42,
    color: 'black',
  },
  inputHidden: {
    display: 'none',
  },
});

class StockService extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', editing: false };
    this.handleChange = this.handleChange.bind(this);
  }
  handleAddStockList = () => {
    if ((this.state.input).length > 0 && (this.state.input).length < 5) {
      let data = {
        id: this.props.stockpos,
        stock: (this.state.input).toUpperCase()
      }
      this.props.addStockList(data);
    }
    // sets state back to empty string
    this.setState({ input: '' })
  }
  handleEditStock = () => {
    let bEdit = this.state.editing;
    if (bEdit) {
      this.handleAddStockList();
    } else {
      let spick = this.props.stockpos + '_input';
      setTimeout(function(){ document.getElementById(spick).focus(); }, 500);
    }
    this.setState({
      editing: !bEdit
    });

    // sets state back to empty string
    this.setState({ input: '' })
  }
  handleChange(ev) {
    // sets state back to empty string
    this.setState({ input: ev.target.value })
  }
  render() {
    const { classes } = this.props;
    return (
      <>
          <input id={this.props.stockpos + '_input'} type="text" 
          className={clsx(classes.inputLook, !this.state.editing && classes.inputHidden )} 
          onChange={this.handleChange} value={this.state.input} />
          <IconButton edge="end" aria-label="edit" onClick={(ev) => this.handleEditStock()}>
            {!this.state.editing &&
            <EditIcon />
            }
            {this.state.editing &&
            <CheckIcon />
            }
          </IconButton>
      </>
    )
  }
}

export default connect(null,{ addStockList, addStock })(withStyles(useStyles)(StockService))