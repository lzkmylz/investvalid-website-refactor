import React from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../../components/Layout';
import UserStore from '../../stores/UserStore';
import DLStore from '../../stores/DLStore';
import GRUPredictAChart from '../../components/GRUPredictAChart';
import {
  Row,
  Select,
  Card,
} from 'antd';
import ReactMarkdown from 'react-markdown';
import ProductBreadcrumb from '../../components/ProductBreadcrumb';
import '../../components/styles/GRUPredictA.scss';

type Props = {
  UserStore: UserStore,
  DLStore: DLStore,
}

const instructionText = `
# Background

The prices of a stock can be seen as time series sequence. And the performance of a stock in one trade day can be divided into two categories -- Up and Down. Then, the problem can be abstract to predict a two categories classification based on given time series sequence.

For this product, the GRU is used to build a RNN to finish predict. In training and testing, the accuracy of predict is about less than 70%. Hope such predict result can help you make better invest decision.
`;

@inject('UserStore', 'DLStore')
@observer
class GRUPredictA extends React.Component<Props> {
  onSelectChange = (value: any) => {
    this.props.DLStore.getStockData(value);
    this.props.DLStore.getGRUPredictData(value);
  }

  render() {
    const { Option } = Select;
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <ProductBreadcrumb PageName="Predict China A Stock" />
          <Row className="grupredict-a-title-container" >
            <h1>Predict China A Stock with GRU</h1>
          </Row>
          <Row className="grupredict-a-select" >
            <span className="grupredict-a-selectname" >Select Stock:</span>
            <Select defaultValue="601939.SH" style={{ width: 120 }} onChange={this.onSelectChange} >
              <Option value="601939.SH" >601939.SH</Option>
              <Option value="600276.SH" >600276.SH</Option>
              <Option value="600340.SH" >600340.SH</Option>
              <Option value="000415.SZ" >000415.SZ</Option>
            </Select>
          </Row>
          <Row className="grupredict-chart-row" >
            <GRUPredictAChart DLStore={this.props.DLStore} />
          </Row>
          <Row className="grupredict-instruction-row" >
            <Card
              title="Instruction"
              className="grupredict-instruction-card"
            >
              <ReactMarkdown
                escapeHtml={false}
                source={instructionText}
              />
            </Card>
          </Row>
        </div>
    <style jsx >{`
    `}</style>
      </Layout>
    )
  }
}

export default GRUPredictA;
