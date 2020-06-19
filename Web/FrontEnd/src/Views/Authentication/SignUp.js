import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      storeDescription: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    return <div />;
  }
}
