// Kroftig frontend src/components/Log.js
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
  QueryRenderer,
  graphql
} from 'react-relay';

import environment from '../Environment';
import LogCommitList from './LogCommitList';

const LogQuery = graphql`
  query LogQuery($name: String!) {
    repo(name: $name) {
      currentBranch
      ...LogCommitList_repo
    }
  }
`;

class Log extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={LogQuery}
        variables={{ name: this.props.match.params.repo }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div>
                <div>Repository: {this.props.match.params.repo}</div>
                <div>Branch: {props.repo.currentBranch}</div>
                <div>!FIX! Requested Branch: {this.props.match.params.branch}</div>
                <LogCommitList repo={props.repo} />
              </div>
            );
          }
          return <div>Loading...</div>;
        }}
      />
    );
  }

}

export default Log;
