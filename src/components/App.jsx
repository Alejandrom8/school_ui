import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Subject from '../pages/Subject';
// import SemesterContainer from '../components/containers/SemesterContainer';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => 'Hola'} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            {/* <Route exact path="/sf" component={() => (
                  <SemesterContainer />
            )} /> */}
            <Route exact path="/home" component={Home} />
            <Route exact path="/subject/:subjectID" component={Subject} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
