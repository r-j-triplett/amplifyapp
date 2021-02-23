import React from 'react';
import './stocklistitem.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: 0
    },
}));

const StockListItem = (stock, props) => {
  const classes = useStyles();
  return (
    <>
    <ListItem className={classes.item}>
        <ListItemText primary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
            <b>Symbol :  </b>
            </Typography>
            { stock.symbol }
            </React.Fragment>
        }/>
    </ListItem>
    <ListItem className={classes.item}>
        <ListItemText primary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
            <b>Price :  </b>
            </Typography>
            ${ parseInt(stock.price).toFixed(2) }
            </React.Fragment>
        }/>
    </ListItem>
    <ListItem className={classes.item}>
        <ListItemText primary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
            <b>Volume :  </b>
            </Typography>
            { stock.volume }
            </React.Fragment>
        }/>
    </ListItem>
    <ListItem className={classes.item}>
        <ListItemText primary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
            <b>Open :  </b>
            </Typography>
            ${ parseInt(stock.open).toFixed(2) }
            </React.Fragment>
        }/>
    </ListItem>
    <ListItem className={classes.item}>
        <ListItemText primary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
            <b>High :  </b>
            </Typography>
            ${ parseInt(stock.high).toFixed(2) }
            </React.Fragment>
        }/>
    </ListItem>
    <ListItem className={classes.item}>
        <ListItemText primary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
            <b>Low :  </b>
            </Typography>
            ${ parseInt(stock.low).toFixed(2) }
            </React.Fragment>
        }/>
    </ListItem>
    </>
  )
}
export default StockListItem;