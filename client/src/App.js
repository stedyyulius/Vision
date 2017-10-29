import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Auth from './containers/Auth'
import Main from './containers/Main'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div>               
          <Switch>        
            <Route 
            exact path="/login"
            component={Auth}
            />    
            <Route
            exact path="/"
            component= {Main} />}       
            />  
          </Switch>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
