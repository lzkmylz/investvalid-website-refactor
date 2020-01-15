import React from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout';
import UserStore from '../stores/UserStore';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Register extends React.Component<Props> {
  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <div className="register-title" >
            <p>Sign Up</p>
          </div>
        </div>
    <style jsx >{`
      .register-title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
      }
    `}</style>
      </Layout>
    )
  }
}

export default Register;
