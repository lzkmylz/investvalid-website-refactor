import { observable, action } from 'mobx';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import axios from 'axios';
import { config, urlBase } from '../utils/Constants';
import BaseStore from '../utils/BaseStore';

// private variable types
export type UserAttributes = {
  email: string,
  nickname: string,
  sub: string,
  emailVerified: Boolean,
  s3_avatar_url: string
}

class UserStore extends BaseStore {
  // obervable variables
  @observable userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId ? config.cognito.userPoolId : '',
    ClientId: config.cognito.userPoolClientId ? config.cognito.userPoolClientId : ''
  });
  @observable cognitoUser: CognitoUser | null = null;
  @observable accessToken: String = '';
  @observable userAttributes: UserAttributes = {
    email: '',
    nickname: '',
    sub: '',
    emailVerified: false,
    s3_avatar_url: ''
  };
  @observable userAvatarBase64: string = '';

  // actions
  @action setCognitoUser = (cognitoUser: CognitoUser | null) => {
    this.cognitoUser = cognitoUser;
  }

  @action setAccessToken = (accessToken: String) => {
    this.accessToken = accessToken;
  }

  @action getUserPool = () => {
    return this.userPool;
  }

  @action setUserAttributes = (attributes: UserAttributes) => {
    this.userAttributes = attributes;
  }

  @action initUserFromLocalStorage = () => {
    var cognitoUser = this.userPool.getCurrentUser();
    if(cognitoUser != null) {
      this.setCognitoUser(cognitoUser);
      cognitoUser.getSession((err: Error, result: any) => {
        if(err) {
          console.log(err);
        }
        var accessToken = result.getAccessToken().getJwtToken();
        this.setAccessToken(accessToken);
        if(cognitoUser === null) return;
        cognitoUser.getUserAttributes((err, result) => {
          if(err) {
            console.log(err.message);
            return;
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
            if(result[i].getName() === "custom:s3_avatar_url") userAttributes.s3_avatar_url = result[i].getValue();
          }
          this.setUserAttributes(userAttributes);
          this.getAvatar().then(data => {
            this.userAvatarBase64 = data.data.data;
          }, err => console.log(err))
        });
      });
    }
  }

  @action UserLogOut = () => {
    if(this.cognitoUser != null) {
      this.cognitoUser.signOut();
      this.setCognitoUser(null);
      this.setAccessToken('');
      this.setUserAttributes({
        email: '',
        nickname: '',
        sub: '',
        emailVerified: false,
        s3_avatar_url: ''
      });
    }
  }

  @action SetAvatar = (avatarUrl: string) => {
    if(this.cognitoUser != null) {
      var attributeList = [];
      var attribute = {
        Name: 'custom:s3_avatar_url',
        Value: avatarUrl,
      };
      attributeList.push(attribute);
      this.cognitoUser.updateAttributes(attributeList, function(err: any, result: any) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('call result: ' + result);
      });
    }
  }

  @action UpdateAvatar = (file: string, filetype: string) => {
    let url = `${urlBase}/v1/userAttr/updateAvatar`;
    let body = {
      file: file,
      filetype: filetype
    };
    return axios.post(url, JSON.stringify(body));
  }

  @action UpdateS3Avatar = (avatarName: string) => {
    let update = new Promise((resolve, reject) => {
      if(!this.cognitoUser) {
        return new Error('NotLogined');
      }
      var attributeList = [];
      var attribute = {
        Name: 'custom:s3_avatar_url',
        Value: avatarName,
      };
      attributeList.push(attribute);
      this.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    return update;
  }

  @action getAvatar = () => {
    let url = `${urlBase}/v1/userAttr/getAvatar/${this.userAttributes.s3_avatar_url}`;
    return axios.get(url);
  }
}

export default UserStore;
