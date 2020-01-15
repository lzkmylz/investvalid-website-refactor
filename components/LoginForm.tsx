import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
} from 'antd';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  ICognitoUserData
} from 'amazon-cognito-identity-js';
import Router from 'next/router';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import UserStore, { UserAttributes } from '../stores/UserStore';
import Link from 'next/link';

interface Props extends FormComponentProps {
  UserStore: UserStore
}

@observer
class LoginForm extends React.Component<Props> {
  state = {
    notAuthorized: undefined,
    loading: false,
  }

  handleSubmit = (e:any) => {
    const { UserStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
        this.setState({ loading: true });
        var authenticationData = {
          Username: values.username,
          Password: values.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var userPool = UserStore.getUserPool();
        if(!userPool) {
          throw Error("Cognito UserPool Error!");
        }
        var userData: ICognitoUserData = {
          Username: values.username,
          Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result: CognitoUserSession) => {
            var accessToken = result.getAccessToken().getJwtToken();
            UserStore.setAccessToken(accessToken);
            cognitoUser.getUserAttributes((err: any, result: any) => {
              if(err) {
                console.log(err.message);
              }
              if(result === undefined) return;
              var userAttributes: UserAttributes = {
                email: '',
                nickname: '',
                sub: '',
                emailVerified: false,
                s3_avatar_url: ''
              };
              for (let i = 0; i < result.length; i++) {
                if(result[i].getName() === "email") userAttributes.email = result[i].getValue();
                if(result[i].getName() === "nickname") userAttributes.nickname = result[i].getValue();
                if(result[i].getName() === "sub") userAttributes.sub = result[i].getValue();
                if(result[i].getName() === "email_verified") userAttributes.emailVerified = Boolean(result[i].getValue());
              }
              UserStore.setUserAttributes(userAttributes);
              if(!values.remember) {
                localStorage.clear();
              }
              Router.push("/");
            });
          },
          onFailure: (err: any) => {
            if(err.code === "NotAuthorizedException") {
              this.setState({ notAuthorized: "error", loading: false });
            }
          }
        });
      }
    });
  };

  resetErrorState = () => {
    this.setState({ notAuthorized: undefined });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      notAuthorized,
      loading,
    } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{
          position: "relative",
          maxWidth: 300,
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <Form.Item
          validateStatus={notAuthorized}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              id="login-username"
              size="small"
              onChange={this.resetErrorState}
            />,
          )}
        </Form.Item>
        <Form.Item
          validateStatus={notAuthorized}
          help={notAuthorized ? "Incorrect username or password" : ""}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              size="small"
              onChange={this.resetErrorState}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{ color: "#1890ff" }} className="login-remember" >Remember me</Checkbox>)}
          <Link href="/forget-password" >
            <a style={{ float: "right" }} >Forgot password</a>
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            size="small"
            loading={loading}
          >
            Sign In
          </Button>
          Or <Link href="/register" ><a>Sign Up now!</a></Link>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<Props>({ name: 'login' })(LoginForm);
