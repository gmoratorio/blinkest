import {
    APPLICATION_READY,
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

export const initializeApplication = () => {

    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return {
        type: APPLICATION_READY
    }

};