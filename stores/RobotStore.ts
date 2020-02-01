import { observable, action } from 'mobx';
import axios from 'axios';
import BaseStore from './BaseStore'
import { urlBase } from '../utils/Constants';

class RobotStore extends BaseStore {
  @observable messages = [{
    position: 'left',
    type: 'text',
    text: 'Please enter your questions here and wait response from our QA system.',
    date: new Date(),
  }];

  @action initMessages() {
    this.messages = [{
      position: 'left',
      type: 'text',
      text: 'Please enter your questions here and wait response from our QA system.',
      date: new Date(),
    }];
  }

  @action addToMessages(message: any) {
    this.messages.push(message);
  }

  @action getAnswer(question: string) {
    let url = `${urlBase}/v2/robot/compute_vector`;
    let body = {
      corpora_id: "1",
      question: question,
      method: "compute_answer"
    };
    axios.post(url, JSON.stringify(body)).then((data) => {
      let requestId = data.data.request_id;
      let answerUrl = `${urlBase}/v2/robot/query_answer`;
      let answerBody = {
        request_id: requestId
      };
      let timmer = setInterval(async () => {
        let answerData = await axios.post(answerUrl, JSON.stringify(answerBody))
        if(answerData.data.answer) {
          clearInterval(timmer);
          let message = {
            position: 'left',
            type: 'text',
            text: answerData.data.answer,
            date: new Date(),
          }
          this.messages.push(message);
        }
      }, 10000);
    });
  }
}

export default RobotStore;
