import React from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout';
import UserStore from '../stores/UserStore';
import DonateBoard from '../components/DonateBoard';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Donate extends React.Component<Props> {

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <h1 className="donate-title" >This is a personnal project</h1>
          <h1 className="donate-title" >If you think this website can help you</h1>
          <h1 className="donate-title" >Just donate for a cup of coffee</h1>
          <DonateBoard />
        </div>
    <style jsx >{`
      .donate-title {
        font-size: 20px;
        margin: 20px;
      }
    `}</style>
      </Layout>
    )
  }
}

export default Donate;
