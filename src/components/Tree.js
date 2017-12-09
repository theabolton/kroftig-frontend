// Kroftig frontend src/components/Tree.js
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
import { Table } from 'react-bootstrap';

import environment from '../Environment';
import TreeEntry from './TreeEntry';

const TreeQuery = graphql`
  query TreeQuery($name: String! $rev: String! $path: String) {
    repo(name: $name) {
      tree(rev: $rev path: $path first: 100) @connection(key: "TreeQuery_tree") {
        edges {
          node {
            ...TreeEntry_entry
          }
        }
      }
    }
  }
`;

class Tree extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={TreeQuery}
        variables={{
          name: this.props.match.params.repo,
          rev: this.props.match.params.rev,
          path: this.props.match.params.path,
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            let repo = this.props.match.params.repo;
            let rev = this.props.match.params.rev;
            let path = this.props.match.params.path;
            return (
              <div>
                <div>Repository: {repo}</div>
                <div>Branch/Tag/Rev: {rev}</div>
                <div>Path: {path ? path : '/'}</div>
                <Table condensed style={{width: 'auto'}}>
                  <tbody>
                    {props.repo.tree.edges.map(({node}) =>
                      <TreeEntry key={node.__id} repo={repo} rev={rev} path={path} entry={node} />
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

export default Tree;
