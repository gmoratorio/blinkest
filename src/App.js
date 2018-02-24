import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import store from './store';
import BlinkestIndex from './components/BlinkestIndex';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
     <Provider store={store}r>
         <BrowserRouter>
             <div>
                 <Switch>
                     <Route path="/" component={BlinkestIndex}/>
                 </Switch>
             </div>
         </BrowserRouter>
     </Provider>
    );
  }
}

export default App;
