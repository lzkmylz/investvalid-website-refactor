import React from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout';
import UserSotre from '../stores/UserStore';
import SignupConfirmForm from '../components/SignupConfirmForm';

type Props = {
  UserStore: UserSotre
}

@inject('UserStore')
@observer
class SignupConfirm extends React.Component<Props> {
  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <div className="signup-confirm-container" >
            <h1 className="signup-confirm-title" >Confirm Your Email!</h1>
            <p className="signup-confirm-content" >
              We have send an Email with captcha to your email, please enter it in the input below:
            </p>
          </div>
          <SignupConfirmForm UserStore={this.props.UserStore} />
        </div>
    <style jsx >{`
      .signup-confirm-container {
        text-align: center;
      }
      .signup-confirm-title {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .signup-confirm-content {
        margin-bottom: 20px;
      }
    `}</style>
      </Layout>
    );
  }
}

export default SignupConfirm;
