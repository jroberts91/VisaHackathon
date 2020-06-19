import React from 'react';
/**
 * Handles the logic and design of the Login Page.
 * It redirects user to their accessible pages after logging in.
 */
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount = () => {};

  render() {
    return <div />;
  }
}
