import React from 'react';
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout';
//import Link from 'next/link';
import UserStore from '../stores/UserStore';
import { Row } from 'antd';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Login extends React.Component<Props> {

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <Row style={{ display: "flex", flexDirection: "row" }} >
            <div className="login-img-container" >
              <div className="login-img-bound" >
                <img src="/static/login-side.jpg" alt="data change world" className="login-side-img" />
              </div>
            </div>
            <div className="login-form-container" >
              <h1 className="login-title" >Sign In</h1>
            </div>
          </Row>
        </div>
    <style jsx >{`
      @media screen and (min-width: 426px) {
        .login-img-container {
          flex: 1;
        }
        .login-img-bound {
          width: 424px;
          height: 238px;
          margin: 0 auto;
        }
        .login-side-img {
          width: 100%;
          height: 100%;
        }
      }
      .login-form-container {
        flex: 1;
        text-align: center;
      }
      .login-title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
      }
    `}</style>
      </Layout>
    );
  }
}

export default Login;
