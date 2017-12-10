// Kroftig frontend src/components/Branches.js
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
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import environment from '../Environment';

const BranchesQuery = graphql`
  query BranchesQuery($name: String!) {
    repo(name: $name) {
      branches(first: 100) @connection(key: "BranchesQuery_branches") {
        edges {
          node {
            name message rev ctime
          }
        }
      }
    }
  }
`;

class Branches extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={BranchesQuery}
        variables={{ name: this.props.match.params.repo }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            let repo = this.props.match.params.repo
            return (
              <div>
                <div>Repository: {this.props.match.params.repo}</div>
                <div>Branches:</div>
                <Table style={{width: 'auto'}}>
                  <tbody>
                    {props.repo.branches.edges.map(({node}) =>
                        <tr key={node.__id}>
                          <td>{node.name}</td>
                          <td>{node.rev.slice(0,7)}</td>
                          <td>{node.message}</td>
                          <td>{node.ctime}</td>
                          <td><Link to={`/browse/${repo}/commits/${node.name}`}>log</Link></td>
                          <td><Link to={`/browse/${repo}/tree/${node.name}`}>tree</Link></td>
                        </tr>
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

export default Branches;
