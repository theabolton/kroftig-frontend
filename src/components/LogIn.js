// Kroftig frontend src/components/LogIn.js
//
// Copyright © 2017 Sean Bolton.
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component } from 'react';
import {
  Button, ControlLabel, FormControl, FormGroup,
} from 'react-bootstrap';

import LogInMutation from '../mutations/LogInMutation';

class LogIn extends Component {

  state = {
    username: '',
    password: '',
  };

  handleSubmit = (event) => {
    const { username, password } = this.state;
    if (username && password) {
      LogInMutation(username, password, username => {
        this.props.history.push(`/repos`);
      });
    }
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formLogInUsername">
          <ControlLabel>Enter Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        <FormGroup controlId="formLogInPassword">
        </FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="text"
            value={this.state.password}
            placeholder="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Log In</Button>
      </form>
    );
  }
}

export default LogIn;
