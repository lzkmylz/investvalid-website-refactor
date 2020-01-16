import React from 'react';
import { observer } from 'mobx-react';
import {
  Form,
  Input,
  Button
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import UserStore from '../stores/UserStore';
import Router from 'next/router';

interface Props extends FormComponentProps {
  UserStore: UserStore
}

@observer
class SignupConfirmForm extends React.Component<Props> {
  state = {
    captchaError: undefined,
    loading: false,
  }

  handleSubmit = (e: any) => {
    const { UserStore } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(!err) {
        if(UserStore.cognitoUser == null) return;
        this.setState({ loading: true });
        UserStore.cognitoUser.confirmRegistration(values.captcha, true, (err) => {
          if(!err) {
            Router.push('/')
          } else {
            this.setState({ captchaError: 'error' });
          }
        });
      }
    });
  }

  onCaptchaChange = () => {
    if(this.state.captchaError) {
      this.setState({ captchaError: undefined });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      captchaError,
      loading,
    } = this.state;
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Form.Item
            validateStatus={captchaError}
            help={captchaError ? "Please enter correct captcha!" : ""}
          >
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input your captcha!' }],
            })(
              <Input
                onChange={this.onCaptchaChange}
                placeholder="captcha"
              />,
            )}
          </Form.Item>
          <Form.Item
            style={{
              marginLeft: 20
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}

            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<Props>({ name: 'signup-confirm' })(SignupConfirmForm);
