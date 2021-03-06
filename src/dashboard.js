import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { addStock, initStockList } from './components/Actions/actions'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DisplayContent from './apicontainer';
import { CookiesProvider } from "react-cookie";
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
//import DashboardIcon from '@material-ui/icons/Dashboard';
import StockService from './components/StockServices/stockservice';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import HourMin from './components/Clock/time'
const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  textButton: {
    width: 180,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  editButton: {
    display: 'inline',
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'none',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

const mapStateToProps = (state) => {
  return {
    stocklist: state.allStocks,
    stockpick: state.stockpick
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open: true,
        stock: this.props.stockpick,
        stocklist: this.props.stocklist
    };
    const url = 'https://c9r5ofpmxb.execute-api.us-east-2.amazonaws.com/default/getStockList?name=Robert';
   // const url = 'https://4ica1xubik.execute-api.us-east-1.amazonaws.com/dev/getstocklist?name=Robert';
    axios.get(url)
      .then(res => {
        let initList = (res.data.Item.stocklist).split(',');
        let data = {
          stocklist: initList
        }
        this.props.initStockList(data);
        this.setState({
          stocklist: initList
        });
      })
  };

  setOpen = (cstate) => {
    this.setState({
      open: cstate
    });
  }

  handleDrawerOpen = () => {
    this.setOpen(true);
  }
  handleDrawerClose = () => {
    this.setOpen(false);
  }
  setStockPick = (dPick, ev) => {
    this.setState({stock: dPick});
    let data = {
      stock: (dPick).toUpperCase()
    }
    this.props.addStock(data);
  }

  render () {
    let stockNum = 0;
    const { classes } = this.props;
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let id = new Date();
    id = ''+ id.getHours() + id.getMinutes() + id.getSeconds() + id.getMilliseconds();
  return (
    <CookiesProvider>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Stock Information
          </Typography>
          <HourMin />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <div>
            {this.state.stocklist.map((stock) => (
                <ListItem key={stockNum++}>
                  <Button className={clsx(classes.textButton, !this.state.open && classes.menuButtonHidden)} onClick={(ev) => this.setStockPick(stock, ev)}>
                    <ListItemText className={classes.root} primary={stock} />
                  </Button>
                  <ListItemSecondaryAction className={clsx(classes.editButton, !this.state.open && classes.menuButtonHidden)}>      
                    <StockService stock={stock} stockpos={stockNum} />
                  </ListItemSecondaryAction>
                </ListItem>
            ))}
        </div>
        
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <DisplayContent stock={this.props.stockpick} key={id}/>
      </main>
    </div>
    </CookiesProvider>
  );
  }
}

export default connect(mapStateToProps, {addStock, initStockList})(withStyles(useStyles)(Dashboard))