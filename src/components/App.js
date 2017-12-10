// Kroftig frontend src/components/App.js
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
import { Switch, Route } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import Branches from './Branches';
import FullCommit from './FullCommit';
import Log from './Log';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Navigation from './Navigation';
import Repos from './Repos';
import Tree from './Tree';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container-fluid fluid-margined">
          <Row>
          <Switch>
            <Route exact path="/browse/:repo([-\w]+)/branches" component={Branches}/>
            <Route exact path="/browse/:repo([-\w]+)/commit/:rev" component={FullCommit}/>
            <Route exact path="/browse/:repo([-\w]+)/commits/:rev?" component={Log}/>
            <Route exact path="/browse/:repo([-\w]+)/tree/:rev?/:path*" component={Tree}/>
            {/* default view for repo: */}
            <Route exact path="/browse/:repo([-\w]+)" component={Log}/>
            <Route exact path='/login' component={LogIn}/>
            <Route exact path='/logout' component={LogOut}/>
            <Route exact path="/repos" component={Repos}/>
            {/* default view for site: */}
            <Route render={({ location }) => (<div>Hello from {location.pathname}!</div>)}/> {/* !FIX! */}
          </Switch>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
