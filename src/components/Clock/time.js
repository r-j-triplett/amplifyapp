import { withStyles } from '@material-ui/core';
import React, {useState} from 'react';

const useStyles = (theme) => ({
  theprint: {
    color: 'yellow',
  }
});

/*
export default function HourMin() {
  const [hourmin, setHourMin] = useState(new Date());
   useEffect(() => {
    console.log(hourmin);
   });
    let idInterval = setInterval(() => {setHourMin(new Date());}, 1000);

    return (
      <div>
{(hourmin).getHours()} : {(hourmin).getMinutes()} : {(hourmin).getSeconds()}
      </div>
    );

}*/

class HourMin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hourmin: new Date()
    }
  }
  getTick = () => {
    this.setState({
      hourmin: new Date()
    })
  }

  componentDidMount= () => {
    let intervalID = setInterval(() => {this.getTick()}, 1000);
    this.setState({
      intervalId: intervalID
    })
  }
  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.theprint}>
    {(this.state.hourmin).getHours()} : {(this.state.hourmin).getMinutes()} : {(this.state.hourmin).getSeconds()}
      </div>
    )
  }
}

export default withStyles(useStyles)(HourMin)