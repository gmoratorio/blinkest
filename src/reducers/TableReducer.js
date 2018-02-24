import {
    RESULTS_SORTED
} from '../actions/types';

import {SORT_STYLE, POST_SPECS} from '../constants';

const INITIAL_STATE = {
    sortKey: POST_SPECS.CREATED_AT,
    sortStyle: SORT_STYLE.ASC,
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case RESULTS_SORTED:
            const {currentSortKey, newSortKey, currentSortStyle} = payload;
            let sortStyle = SORT_STYLE.ASC;

            if (newSortKey === currentSortKey) {
                sortStyle = currentSortStyle === SORT_STYLE.ASC ? SORT_STYLE.DESC : SORT_STYLE.ASC;
            }

            return {...state, sortKey: newSortKey, sortStyle};


        default:
            return state;
    }
};