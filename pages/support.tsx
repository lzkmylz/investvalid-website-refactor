import React from 'react';
import Layout from '../components/Layout';
import { observer, inject } from 'mobx-react';
import UserStore from '../stores/UserStore';
import RobotStore from '../stores/RobotStore';
import { Button } from 'antd';
import $ from 'jquery';
/// <reference path=".../utils/react-chat-elements.d.ts" />
import {
  MessageList,
  Input,
} from 'react-chat-elements';
import "react-chat-elements/dist/main.css";


type Props = {
  UserStore: UserStore,
  RobotStore: RobotStore
}

@inject('UserStore', 'RobotStore')
@observer
class Support extends React.Component<Props> {
  componentDidMount = () => {
    $(".msg-input").keypress((e) => {
      if(e.key === "Enter") {
        let text = String($(".rce-input").val());
        if(text) {
          this.addToMessages(text.toString());
        }
        $(".rce-input").val("")
      }
    });
    this.props.RobotStore.initMessages();
  }

  addToMessages = (text: string) => {
    let message = {
      position: 'right',
      type: 'text',
      text: text.toString(),
      date: new Date(),
    }
    this.props.RobotStore.addToMessages(message);
    this.props.RobotStore.getAnswer(text);
  }

  onSubmitMessage = async (e: any) => {
    let text = await $(".rce-input").val();
    if(text) {
      this.addToMessages(text.toString());
    }
    $(".rce-input").val("");
  }

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
        <div className="support-title" >
            <h1 className="support-title-h1" >Support</h1>
          </div>
          <div className="chat-board-container" >
            <div className="chat-msg-container" >
              <MessageList
                className='message-list'
                lockable={false}
                toBottomHeight={'100%'}
                dataSource={this.props.RobotStore.messages}
              />
            </div>
            <Input
              className="msg-input"
              placeholder="Type here..."
              multiline={false}
              rightButtons={
                <Button type="primary" onClick={this.onSubmitMessage} >Send</Button>
              }
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Support;
