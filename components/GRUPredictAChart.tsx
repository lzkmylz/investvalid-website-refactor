import React from 'react';
import { observer } from 'mobx-react';
import * as Highcharts from 'highcharts';
import DLStore from '../stores/DLStore';

type Props = {
  DLStore: DLStore
}

@observer
class GRUPredictAChart extends React.Component<Props> {
  componentDidMount() {
    this.updateChart();
  }

  componentWillUpdate() {
    this.updateChart();
  }

  updateChart = () => {
    var options: any = {
      chart: {
          type: 'spline'
      },
      title: {
          text: 'stock performance'
      },
      xAxis: {
          type: 'datetime',
          labels: {
              overflow: 'justify'
          }
      },
      yAxis: {
          title: {
              text: 'result'
          },
          min: -1,
          labels: {
            enabled: false
          },
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotBands: [{ // Light air
              from: -1,
              to: 0,
              color: 'rgba(68, 170, 213, 0.1)',
              label: {
                  text: 'Down',
                  style: {
                      color: '#606060'
                  }
              }
          }, { // Light breeze
              from: 0,
              to: 1,
              color: 'rgba(0, 0, 0, 0)',
              label: {
                  text: 'Up',
                  style: {
                      color: '#606060'
                  }
              }
          }]
      },
      tooltip: {
        formatter() {
          var self: any = this;
          let text = 
            `stock code: ${self.points[0].point.name}<br>`
            + `trade date: ${self.points[0].point.date}<br>`
            +  `open: ${self.points[0].point.open}<br>`
            + `high: ${self.points[0].point.high}<br>`
            + `low: ${self.points[0].point.low}<br>`
            + `close: ${self.points[0].point.close}<br>`
            + `vol: ${self.points[0].point.vol}<br>`
            + `amount: ${self.points[0].point.amount}`
          return text;
        },
        shared: true,
      },
      plotOptions: {
          spline: {
              lineWidth: 4,
              states: {
                  hover: {
                      lineWidth: 5
                  }
              },
              marker: {
                  enabled: false
              },
          }
      },
      series: [this.props.DLStore.currentStockData, this.props.DLStore.predictStockData],
      navigation: {
          menuItemStyle: {
              fontSize: '10px'
          }
      }
    };
    Highcharts.chart('stock-chart', options);  
  }

  render() {
    if(this.props.DLStore.currentStockData.data.length !== 0 &&
        this.props.DLStore.predictStockData.data.length !== 0) {
      this.updateChart();
    }
    return (
      <div id="stock-chart" ></div>
    );
  }
}

export default GRUPredictAChart;
