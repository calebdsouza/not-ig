import './App.css';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './js/components/Header';

import SignUp from './js/components/SignUp';
import AuthProvider from './js/contexts/AuthCtx';
import Login from './js/components/Login';
import ImageGallery from './js/components/Image/Gallery'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Helmet>
          <title> Not IG </title>
        </Helmet>
        <AuthProvider>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" render={(props) => <SignUp {...props} />} />
            <Route path="/dashboard" component={ImageGallery} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}
export default App;
