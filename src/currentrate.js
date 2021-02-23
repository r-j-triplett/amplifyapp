import React from 'react';
import Ticker from './components/Ticker/ticker.js';

export default function CurrentRate(props) {
  let id = new Date();
  id = ''+ id.getHours() + id.getMinutes() + id.getSeconds() + id.getMilliseconds();
  return (
    <>
      <Ticker stock={props.stock} key={id}/>
    </>
  );
}