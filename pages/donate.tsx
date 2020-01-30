import React from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout';
import Link from 'next/link';
import UserStore from '../stores/UserStore';
import $ from 'jquery';
import Clipboard from 'react-clipboard.js';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Donate extends React.Component<Props> {

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >

      </Layout>
    )
  }
}

export default Donate;
