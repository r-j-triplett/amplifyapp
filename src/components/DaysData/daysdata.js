import axios from 'axios';

const nDisplayCount = 7;

export default function DaysData (stock) {
  let objResult = {
      lastdays: [],
      render: false,
      stock: stock
  };

  const key = 'GMHJV0B7E3797NVI';
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stock}&apikey=${key}`;
  
  axios.get(url)
    .then(res => {
        const result = res.data['Time Series (Daily)'];
        console.log(result);
        let lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 1);

        //Only interested in last 7 days
        for (let i = 0; i < nDisplayCount; ) {
            let nMonth = (lastDate.getMonth() < 9) ? '0' + (lastDate.getMonth() + 1) : (lastDate.getMonth() + 1);
            let nDate = (lastDate.getDate() < 10) ? '0' + (lastDate.getDate()) : (lastDate.getDate());
            let strDate = lastDate.getFullYear() + '-' + nMonth + '-' + nDate;
            console.log(strDate);
            let strValues = result[strDate];
            if (strValues !== undefined) {
                console.log(strValues);
                let objRow = {
                  date: (lastDate.getMonth() + 1) + '/' + lastDate.getDate() + '/' + lastDate.getFullYear(),
                  open: strValues['1. open'],
                  high: strValues['2. high'],
                  low: strValues['3. low'],
                  close: strValues['4. close'],
                  volume: strValues['5. volume']
                }

                objResult.lastdays.push(objRow);
                //console.log(this.state.lastdays);
                i++;
            }
            lastDate.setDate(lastDate.getDate() - 1);
        }
        objResult.render = true;
    })
    .catch(error => console.log(error))
  return objResult;
}
