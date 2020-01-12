import React from 'react'
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout'
import UserStore from '../stores/UserStore';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Index extends React.Component<Props> {

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        Test Content
      </Layout>
    )
  }
}

export default Index;
