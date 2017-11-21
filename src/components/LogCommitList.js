// Kroftig frontend src/components/LogCommitList.js
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
  createFragmentContainer,
  graphql
} from 'react-relay';
import {
  Table
} from 'react-bootstrap';

import LogCommit from './LogCommit';

class LogCommitList extends Component {

  render() {
    return (
      <Table condensed style={{width: 'auto'}}>
        <tbody>
          {this.props.repo.commits.edges.map(({node}) =>
              <LogCommit key={node.__id} commit={node} />
          )}
        </tbody>
      </Table>
    );
  }

}

export default createFragmentContainer(LogCommitList, graphql`
  fragment LogCommitList_repo on Repo {
    commits(first: 100) @connection(key: "LogCommitList_commits", filters: []) {
      edges {
        node {
          ...LogCommit_commit
        }
      }
    }
  }
`);
