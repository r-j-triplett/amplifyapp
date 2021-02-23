import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './title';

const nDisplayCount = 7;

function DisplayChart(data) {
  const theme = useTheme();

  return (
    <React.Fragment>
    <ResponsiveContainer>
      <LineChart
          data={data.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Dollars ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      </React.Fragment>
  );
}
// Generate Sales Data
//function createData(stock) {
class Chart extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        lastdays: this.props.stock
    };
  };

  render () {
    return (
      <>
      <Title>Last 7 Close Price Days</Title>
      {this.state.lastdays.length === nDisplayCount &&
          <DisplayChart data={this.state.lastdays}/>
        }
        </>
      );
  }
}

export default Chart;