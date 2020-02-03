import React from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb, Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import UserStore from '../../stores/UserStore';
import StatisticsStore from '../../stores/StatisticsStore';

type Props = {
  UserStore: UserStore,
  StatisticsStore: StatisticsStore,
}

@inject('UserStore', 'StatisticsStore')
@observer
class SimilarityCompute extends React.Component<Props> {
  render() {
    return (
      <Layout UserStore={this.props.UserStore} >

      </Layout>
    );
  }
}

export default SimilarityCompute;
