// Kroftig frontend src/components/FullCommit.js
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
import TreeEntry from './TreeEntry';

const FullCommitQuery = graphql`
  query FullCommitQuery($name: String! $rev: String!) {
    repo(name: $name) {
      commit(rev: $rev) {
        oid
        message
        author
        authorEmail
        authorTime
        committer
        committerEmail
        committerTime
        parentIds
        tree {
          edges {
            node {
              ...TreeEntry_entry
            }
          }
        }
      }
    }
  }
`;

class FullCommit extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={FullCommitQuery}
        variables={{
          name: this.props.match.params.repo,
          rev: this.props.match.params.rev,
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            let repo_name = this.props.match.params.repo;
            let commit = props.repo.commit;
            return (
              <div>
                <div>Repository: {repo_name}</div>
                { this.props.match.params.rev !== commit.oid ?
                  <div>Branch/Tag/Ref: {this.props.match.params.rev}</div> :
                  ''
                }
                <Table condensed style={{width: 'auto'}}>
                  <thead><tr><th colSpan={2}>commit {commit.oid}</th></tr></thead>
                  <tbody>
                    <tr><td>Author:</td><td>{commit.author} &lt;{commit.authorEmail}&gt;</td></tr>
                    <tr><td>Author Time:</td><td>{commit.authorTime}</td></tr>
                    <tr>
                      <td>Committer:</td>
                      <td>{commit.committer} &lt;{commit.committerEmail}&gt;</td>
                    </tr>
                    <tr><td>Committer Time:</td><td>{commit.committerTime}</td></tr>
                    <tr>
                      <td>Parent Commit{commit.parentIds.length > 1 ? 's' : ''}:</td>
                      <td>
                        {commit.parentIds.map((oid, index) =>
                          <Link key={index} to={`/browse/${repo_name}/commit/${oid}`}>
                            {oid.slice(0,7)}
                          </Link>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                {props.repo.commit.message}
                <Table condensed style={{width: 'auto'}}>
                  <tbody>
                    {commit.tree.edges.map(({node}) =>
                      <TreeEntry key={node.__id} repo={repo_name} entry={node} />
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

export default FullCommit;
