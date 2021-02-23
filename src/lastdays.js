import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';

const nDisplayCount = 7;

class LastDays extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lastdays: this.props.stock
        };
    };

  render () {
        return (
            <>
              <Title>Last 7 Days</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Low</TableCell>
                    <TableCell>Close</TableCell>
                    <TableCell>Volume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.lastdays.length === nDisplayCount &&
                  this.state.lastdays.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>${ parseInt(row.open).toFixed(2) }</TableCell>
                      <TableCell>${ parseInt(row.high).toFixed(2) }</TableCell>
                      <TableCell>${ parseInt(row.low).toFixed(2) }</TableCell>
                      <TableCell>${ parseInt(row.close).toFixed(2) }</TableCell>
                      <TableCell>{row.volume}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          );
  }
}

export default LastDays;