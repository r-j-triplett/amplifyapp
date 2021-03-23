import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './chart';
import LastDays from './lastdays';
import Ticker from './components/Ticker/ticker.js';

const nDisplayCount = 7;
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

// Generate Sales Data
//function createData(stock) {
class DisplayContent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        stock: this.props.stock,
        lastdays: [],
        lastdaysdetails: [],
        yesterday: []
    };
    this.getData();
  };
  getData = async() => { 
  const key = 'GMHJV0B7E3797NVI';
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stock}&apikey=${key}`;
  let finalresult = [];

  axios.get(url)
    .then(res => {
        const result = res.data['Time Series (Daily)'];
        let lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 1);
        //Only interested in last 7 days
        for (let i = 0; i < nDisplayCount; ) {
            let nMonth = (lastDate.getMonth() < 9) ? '0' + (lastDate.getMonth() + 1) : (lastDate.getMonth() + 1);
            let nDate = (lastDate.getDate() < 10) ? '0' + (lastDate.getDate()) : (lastDate.getDate());
            let strDate = lastDate.getFullYear() + '-' + nMonth + '-' + nDate;
            if (result === undefined) {
                const showNote = res.data['Note'];
                if (showNote !== undefined) {
                  alert(showNote);
                }
                break;
            } else {
                let strValuesChart = result[strDate];
                //Check if date is a holiday or weekend
                if (strValuesChart !== undefined) {
                  let time =  (lastDate.getMonth() + 1) + '/' + lastDate.getDate();
                  let amount = strValuesChart['4. close'];
                  finalresult.unshift({time, amount});

                  //Details
                  let objRow = {
                  date: (lastDate.getMonth() + 1) + '/' + lastDate.getDate() + '/' + lastDate.getFullYear(),
                  open: strValuesChart['1. open'],
                  high: strValuesChart['2. high'],
                  low: strValuesChart['3. low'],
                  close: strValuesChart['4. close'],
                  volume: strValuesChart['5. volume']
                  }

                  this.setState({
                      lastdaysdetails: this.state.lastdaysdetails.concat(objRow)
                  });
                  //Yesterday
                  if (this.state.yesterday.length < 1) {
                      let stockrename = {
                          symbol: this.props.stock, 
                          price: objRow.close, 
                          open: objRow.open, 
                          high: objRow.high, 
                          low: objRow.low, 
                          volume: objRow.volume
                      };
                      this.setState({
                          yesterday: this.state.yesterday.concat(stockrename)
                      });
                  }
                  i++;
                }
            }

            //counter to day prvious
            lastDate.setDate(lastDate.getDate() - 1);
        }

        this.setState({
          lastdays: this.state.lastdays.concat(finalresult)
        });
    })
    .catch(error => console.log(error))
  };

  render () {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let id = new Date();
    id = ''+ id.getHours() + id.getMinutes() + id.getSeconds() + id.getMilliseconds();
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Current Rate */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Ticker stock={this.state.yesterday} key={id} />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart stock={this.state.lastdays} key={id}/>
              </Paper>
            </Grid>
            {/* Recent LastDays */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <LastDays stock={this.state.lastdaysdetails} key={id}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        </>
      );
  }
}

export default withStyles(useStyles)(DisplayContent);
