import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Subject from '../pages/Subject'
import Activities from '../pages/Activities'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ () => 'Hola' } />
          <Route exact path='/signin' component={ Login } />
          <Route exact path='/signup' component={ SignUp } />
          <Route exact path='/home' component={ Home } />
          <Route exact path='/subject/:scheduledSubjectID' component={ Subject } />
          <Route exact path='/activities' component={ Activities } />
        </Switch>
      </BrowserRouter>
    )
  }
}
