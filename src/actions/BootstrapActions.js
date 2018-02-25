
import {
    UPDATED_DIMENSIONS
} from './types';

export const updateWindowDimensions = () => {

    return {
        type: UPDATED_DIMENSIONS,
        payload: {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        }
    }
};