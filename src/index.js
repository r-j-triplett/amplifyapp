import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './components/Store/store'
import './index.css';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './dashboard';

class Page extends React.Component {
  render() {
    return (
      <>
      <Provider store={store}>
        <Dashboard />
      </Provider>
      </>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
registerServiceWorker();