export var config = {
  cognito: {
      userPoolId: process.env.REACT_APP_AWS_INVESTVALID_USERPOOL_ID,
      userPoolClientId: process.env.REACT_APP_AWS_INVESTVALID_USERPOOL_CLIENT_ID
  }
};

export var urlBase = 'https://api.investvalid.com';