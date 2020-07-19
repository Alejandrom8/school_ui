import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Subject from './pages/Subject';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"> <p>hola</p> </Route>
          <Route path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/subject/:subjectID" component={Subject} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
