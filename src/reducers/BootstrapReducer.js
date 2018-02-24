import {
    VEHICLE_POSTS_READY,
    UPDATED_DIMENSIONS
} from '../actions/types';


const INITIAL_STATE = {
    vehiclePosts: [],
    windowWidth: 0,
    windowHeight: 0
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case VEHICLE_POSTS_READY:
            const {vehiclePosts} = payload;
            return {...state, vehiclePosts};

        case UPDATED_DIMENSIONS:
            const {windowWidth, windowHeight} = payload;
            return {...state, windowWidth, windowHeight};

        default:
            return state;
    }
};