import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useCookies } from "react-cookie";

let stockNum = 0;

export default function MainListItems () {
    const [cookies, setCookie] = useCookies(["selectedstock"]);

    function addCookie(stock) {
      setCookie("selectedstock", stock, {
        path: "/"
      });
    }

    function getStocks() {
      let stockArray = [];
      if (cookies.stocklist !== undefined && cookies.stocklist !== null) {
        stockArray = cookies.stocklist;
      } else {
        stockArray = ['IBM', 'AMZN', 'TSLA'];//Default
        setCookie("selectedstock", 'IBM', {
          path: "/"
        });
      }
      setCookie("stocklist", stockArray, {
        path: "/"
      });
      return stockArray;
    }
    return (
        <div>
            {getStocks().map((stock) => (
                <ListItem key={stockNum++} button onClick={(ev) => addCookie(stock, ev)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={stock} />
                </ListItem>
            ))}
        </div>
    );
}

