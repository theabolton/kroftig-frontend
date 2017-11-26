// Kroftig frontend src/components/TreeEntry.js
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
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { toString as filemodeToString } from 'perms';

class TreeEntry extends Component {

  render() {
    let entry = this.props.entry;
    let name = entry.name;
    let glyph;
    let perms = '';
    let size = '';
    if (entry.type === 'tree' && entry.filemode === 16384) {
      glyph = <Glyphicon glyph="folder-open" />;
    } else if (entry.type === 'commit' && entry.filemode === 57344) {
      // git submodule
      name = name + ' @ ' + entry.oid.slice(0,7);
      glyph = <Glyphicon glyph="folder-close" />;
    } else if (entry.type === 'blob') {
      glyph = <Glyphicon glyph="file" />;
      perms = filemodeToString(entry.filemode);
      size = entry.size;
    } else {
      glyph = '';
      perms = entry.type + ': ' + entry.filemode;
    }
    return (
      <tr key={entry.__id}>
        <td>{glyph}</td>
        <td><Link to={`/browse/${this.props.repo}/blob/${entry.oid}`}>{name}</Link></td>
        <td>{perms}</td>
        <td className="text-right">{size}</td>
      </tr>
    );
  }

}

export default createFragmentContainer(TreeEntry, graphql`
  fragment TreeEntry_entry on TreeEntry {
    oid
    name
    filemode
    type
    size
  }
`);
