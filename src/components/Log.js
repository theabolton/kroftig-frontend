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
import {
  Table
} from 'react-bootstrap';

import environment from '../Environment';
import LogCommit from './LogCommit';

const LogQuery = graphql`
  query LogQuery($name: String! $rev: String) {
    repo(name: $name) {
      currentBranch
      commits(rev: $rev, first: 100) @connection(key: "LogQuery_commits") {
        rev
        edges {
          node {
            ...LogCommit_commit
          }
        }
      }
    }
  }
`;

class Log extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={LogQuery}
        variables={{
          name: this.props.match.params.repo,
          rev: this.props.match.params.branch,
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            // Worktree Current Branch: {props.repo.currentBranch}
            return (
              <div>
                <div>Repository: {this.props.match.params.repo}</div>
                <div>Branch/Tag/Rev: {props.repo.commits.rev || props.repo.currentBranch}</div>
                <Table condensed style={{width: 'auto'}}>
                  <tbody>
                    {props.repo.commits.edges.map(({node}) =>
                        <LogCommit key={node.__id} commit={node} />
                    )}
                  </tbody>
                </Table>
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
