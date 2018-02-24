import {combineReducers} from 'redux';

import SearchReducer from './SearchReducer';
import BootstrapReducer from './BootstrapReducer';

export default combineReducers({
    search: SearchReducer,
    bootstrap: BootstrapReducer
})