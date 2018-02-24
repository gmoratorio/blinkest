import {
    APPLICATION_READY,
    UPDATED_DIMENSIONS
} from '../actions/types';


const INITIAL_STATE = {
    windowWidth: 0,
    windowHeight: 0
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case APPLICATION_READY:
            return state;

        case UPDATED_DIMENSIONS:
            const {windowWidth, windowHeight} = payload;
            return {...state, windowWidth, windowHeight};

        default:
            return state;
    }
};