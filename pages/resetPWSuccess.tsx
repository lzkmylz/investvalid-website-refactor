import React from 'react';
import Layout from '../components/Layout';
import UserStore from '../stores/UserStore';
import { observer, inject } from 'mobx-react';
import Router from 'next/router';
import Countdown, { CountdownRenderProps } from 'react-countdown-now';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class ResetPWSuccess extends React.Component<Props> {
  render() {
    const renderer = ({ seconds, completed }: CountdownRenderProps) => {
      if (completed) {
        Router.push("/");
      } else {
        return <span style={{
          fontSize: 18,
          fontWeight: 600,
        }} >{seconds}</span>;
      }
    };

    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <h1 className="reset-success-title" >Reset Password Success</h1>
          <h3 className="reset-success-detail" >Now you can sign in with your new password!</h3>
          <Countdown date={Date.now() + 5000} renderer={renderer} />
        </div>
    <style jsx >{`
      .reset-success-title {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .reset-success-detail {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .reset-success-hint {
        font-size: 18px;
        font-weight: 600;
      }
    `}</style>
      </Layout>
    );
  }
}

export default ResetPWSuccess;
