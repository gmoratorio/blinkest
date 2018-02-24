import {
    TEST_TYPE
} from '../actions/types';


const INITIAL_STATE = {
    windowWidth: 0,
    windowHeight: 0
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case TEST_TYPE:
            return INITIAL_STATE;

        default:
            return state;
    }
};