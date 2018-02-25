import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import BlinkestIndex from './components/BlinkestIndex';
import VehicleDetail from './components/VehicleDetail';


import store from './store';

class App extends Component {

    render() {
        return (
            <Provider store={store} r>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={BlinkestIndex}/>
                        <Route path="/detail" component={VehicleDetail}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
