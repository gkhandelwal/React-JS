/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Root from './Root'
import Login from './Login'
import Signup from './Signup'
import Foo from './Foo'
import MainLayout from './MainLayout'
import './index.css'
import Addform from './Addform'
import Scrapper from './Scrapper'

var isLogin = true;

// see https://github.com/ReactTraining/react-router
render((
  <Router history={browserHistory}>
      <Route component={MainLayout}>
      <Route path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/root" component={Root}/>
      <Route path="/foo" component={Addform}/>
    </Route>
  </Router>
), document.getElementById('root'))
