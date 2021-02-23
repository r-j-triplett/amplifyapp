import React, { Component } from 'react';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

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

//export default function Dashboard() {
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open: true,
        stock: 'AMZN'
    };
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
  getStocks = () => {
    let stockArray = ['AMZN', 'FUV', 'TSLA', 'MEDT'];//Default
    return stockArray;
  }
  setStockPick = (dPick, ev) => {
    this.setState({stock: dPick});
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
            {this.getStocks().map((stock) => (
                <ListItem key={stockNum++} button onClick={(ev) => this.setStockPick(stock, ev)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={stock} />
                </ListItem>
            ))}
        </div>
        
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <DisplayContent stock={this.state.stock} key={id}/>
      </main>
    </div>
    </CookiesProvider>
  );
  }
}

export default withStyles(useStyles)(Dashboard)