import {
    RESULTS_SORTED
} from './types';

export const sortDataBy = ({currentSortKey, newSortKey, currentSortStyle}) => {

    return {
        type: RESULTS_SORTED,
        payload: {currentSortKey, newSortKey, currentSortStyle}
    }

};