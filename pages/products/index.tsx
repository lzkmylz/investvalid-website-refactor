import React from 'react';
import Layout from '../../components/Layout';
import { List, Card, Collapse } from 'antd';
import { observer, inject } from 'mobx-react';
import UserStore from '../../stores/UserStore';
import '../../components/styles/ProductDashboard.scss';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Product extends React.Component<Props> {
  render() {
    const { Panel } = Collapse;
    const similarityText = (
      <p style={{ paddingLeft: 24 }}>
        Compute the similarity of two stocks. If two stocks have high similarity, they can
        be consider as a pair and use statistical arbitrage methods. <a href="/products/similarityCompute" >Details</a>
      </p>
    );
    const rsrsText = (
      <p style={{ paddingLeft: 24 }} >
        Compute RSRS indicator of the stock. <a href="products/rsrsCompute" >Details</a>
      </p>
    )
    const GRUPredictAH = (
      <p style={{ paddingLeft: 24 }} >
        Using deep learning to predict the price of stock in China A stock market
        based on its previous prices.
        <a href="/products/GRUPredictA" >Details</a>
      </p>
    );
    const GRUPredictSHIndex = (
      <p style={{ paddingLeft: 24 }} >
        Using deep learning to predict the SH Index based on history data.
        <a href="/products/GRUPredictSHIndex" >Details</a>
      </p>
    )
    const data = [{
      title: 'Statistics Based Products',
      cover: "./statistics.jpg",
      coverAlt: "statistics-logo",
      panelHeader: ["Stock Similarity Compute", "RSRS Compute"],
      panelText: [similarityText, rsrsText]
    }, {
      title: 'Deep Learning Based Products',
      cover: "./DL-logo.jpg",
      coverAlt: "DL-logo",
      panelHeader: [
        "A stock price predict based on GRU",
        "SH Index predict based on GRU"
      ],
      panelText: [
        GRUPredictAH,
        GRUPredictSHIndex
      ]
    }];

    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <div className="product-container" >
            <List
              grid={{ gutter: 16, xs: 1, sm: 2 }}
              dataSource={data}
              renderItem={(item: any, ind) => (
                <List.Item>
                  <Card
                    className="product-card"
                    title={item.title}
                    cover={<img src={item.cover} alt={item.coverAlt} />}
                  >
                    <Collapse bordered={false}>
                      {
                        item.panelHeader.map((obj: any, index: number) => (
                          <Panel header={obj} key={index}>
                            {item.panelText[index]}
                          </Panel>
                        ))
                      }
                    </Collapse>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Product;
