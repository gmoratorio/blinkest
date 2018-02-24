import {combineReducers} from 'redux';

import TableReducer from './TableReducer';
import BootstrapReducer from './BootstrapReducer';

export default combineReducers({
    table: TableReducer,
    bootstrap: BootstrapReducer
})