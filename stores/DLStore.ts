import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { urlBase } from '../utils/Constants';
import BaseStore from './BaseStore';

interface stockData {
  name: string,
  data: object[],
}

class DLStore extends BaseStore {
  @observable SHIndexData: stockData = {
    name: 'real',
    data: [],
  };
  @observable predictSHIndexData: stockData = {
    name: 'predict',
    data: [],
  };
  @observable currentStockData: stockData = {
    name: 'real',
    data: [],
  };
  @observable predictStockData: stockData = {
    name: 'predict',
    data: [],
  };

  @action getPredictIndexData = () => {
    let url = `${urlBase}/v1/stockData/getGRUPredictData`;
    let reqBody = {
      stock_name: "000001.SH",
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().add(3, 'days').format('YYYYMMDD'),
    };

    axios.post(url, reqBody).then((data) => {
      let predictSHIndexData: stockData = {
        name: 'predict',
        data: [],
      };
      let items: any = data.data;
      items.sort((a: any, b: any) => moment(a.trade_date, "YYYYMMDD").diff(moment(b.trade_date, "YYYYMMDD")));
      for(let i = 0; i < items.length; i++) {
        let singleData = {
          name: items[i].stock_name,
          x: moment(items[i].trade_date, "YYYYMMDD").valueOf(),
          y: -1,
        };
        if(parseInt(items[i].predict_result)) {
          singleData.y = 1;
        }
        predictSHIndexData.data.push(singleData);
      }
      this.predictSHIndexData = predictSHIndexData;
    });
  }

  @action getIndexData = () => {
    let url = `${urlBase}/v1/stockData/getIndexData`;
    let reqBody = {
      ts_code: "000001.SH",
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().format('YYYYMMDD'),
    };
    axios.post(url, reqBody).then(data => {
      let items = data.data.data.items;
      let SHIndexData: stockData = {
        name: 'real',
        data: [],
      };
      for(let i = 0; i < items.length; i++) {
        let singleData = {
          name: "SH Index",
          x: moment(items[i][1], "YYYYMMDD").valueOf(),
          y: 0,
          date: items[i][1],
          close: items[i][2],
          open: items[i][3],
          high: items[i][4],
          low: items[i][5],
          vol: items[i][9],
          amount: items[i][10],
        }
        if(items[i][2] > items[i][3]) {
          singleData.y = 1;
        } else if (items[i][2] < items[i][3]) {
          singleData.y = -1;
        }
        SHIndexData.data.push(singleData);
      }
      this.SHIndexData = SHIndexData;
    });
  }

  @action getGRUPredictData = (stock_name: string) => {
    let url = `${urlBase}/v1/stockData/getGRUPredictData`;
    let reqBody = {
      stock_name: stock_name,
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().add(3, 'days').format('YYYYMMDD'),
    };
    axios.post(url, reqBody).then((data) => {
      let predictStockData: stockData = {
        name: 'predict',
        data: [],
      };
      let items: any = data.data;
      items.sort((a: any, b: any) => moment(a.trade_date, "YYYYMMDD").diff(moment(b.trade_date, "YYYYMMDD")));
      for(let i = 0; i < items.length; i++) {
        let singleData = {
          name: items[i].stock_name,
          x: moment(items[i].trade_date, "YYYYMMDD").valueOf(),
          y: -1,
        };
        if(parseInt(items[i].predict_result)) {
          singleData.y = 1;
        }
        predictStockData.data.push(singleData);
      }
      this.predictStockData = predictStockData;
    });
  }

  @action getStockData = (ts_code: string) => {
    let url = `${urlBase}/v1/stockData/getAStockData`;
    let reqBody = {
      ts_code: ts_code,
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().format('YYYYMMDD'),
    };
    axios.post(url, reqBody).then(data => {
      let resStockData = data.data.data;
      let currentStockData: stockData = {
        name: "real",
        data: [],
      };
      for(let i = 0; i < resStockData.items.length; i++) {
        let singleData = {
          name: resStockData.items[i][0],
          x: moment(resStockData.items[i][1], "YYYYMMDD").valueOf(),
          y: 0,
          date: resStockData.items[i][1],
          open: resStockData.items[i][2],
          high: resStockData.items[i][3],
          low: resStockData.items[i][4],
          close: resStockData.items[i][5],
          vol: resStockData.items[i][9],
          amount: resStockData.items[i][10],
        };
        if(Number(resStockData.items[i][2]) < Number(resStockData.items[i][5])) {
          singleData.y = 1;
        } else if (Number(resStockData.items[i][2]) > Number(resStockData.items[i][5])) {
          singleData.y = -1
        }
        currentStockData.data.push(singleData);
      }
      this.currentStockData = currentStockData
    });
  }
}

export default DLStore;