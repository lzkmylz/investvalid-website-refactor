import React from 'react';
import Layout from '../components/Layout';
import { observer, inject } from 'mobx-react';
import UserStore from '../stores/UserStore';
import ResetPasswordForm from '../components/ResetPasswordForm';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class ResetPassword extends React.Component<Props> {
  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <div className="resetpw-title-container" >
            <h1 className="resetpw-title" >Reset Password</h1>
            <p className="resetpw-detail" >Please input your new password:</p>
          </div>
          <ResetPasswordForm UserStore={this.props.UserStore} />
        </div>
    <style jsx >{`
      .resetpw-title-container {
        text-align: center;
      }
      .resetpw-title {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .resetpw-detail {
        margin-bottom: 20px;
      }
    `}</style>
      </Layout>
    );
  }
}

export default ResetPassword;
