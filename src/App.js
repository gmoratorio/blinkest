import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import BlinkestIndex from './components/BlinkestIndex';
import store from './store';

class App extends Component {

    render() {
        return (
            <Provider store={store} r>
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
