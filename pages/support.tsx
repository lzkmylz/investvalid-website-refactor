import React from 'react';
import Layout from '../components/Layout';
import { observer, inject } from 'mobx-react';
import UserStore from '../stores/UserStore';
import RobotStore from '../stores/RobotStore';
import { Row } from 'antd';
import SupportBoard from '../components/SupportBoard';

type Props = {
  UserStore: UserStore,
  RobotStore: RobotStore
}

@inject('UserStore', 'RobotStore')
@observer
class Support extends React.Component<Props> {

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <Row>
            <h1 className="support-title" >Support</h1>
          </Row>
          <SupportBoard RobotStore={this.props.RobotStore} />
        </div>
        <style jsx >{`
          .support-title {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 600;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Support;
