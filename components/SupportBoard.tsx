import React from 'react';
import RobotStore from '../stores/RobotStore';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import $ from 'jquery';
/// <reference path=".../utils/react-chat-elements.d.ts" />
import {
  MessageList,
  Input,
} from 'react-chat-elements';
import "react-chat-elements/dist/main.css";
import './styles/SupportBoard.scss';

type Props = {
  RobotStore: RobotStore
}

@observer
class SupportBoard extends React.Component<Props> {
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

  onSubmitMessage = async () => {
    let text = await $(".rce-input").val();
    if(text) {
      this.addToMessages(text.toString());
    }
    $(".rce-input").val("");
  }

  render() {
    return (
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
    );
  }
}

export default SupportBoard;
