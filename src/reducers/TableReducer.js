import _ from 'lodash';

import {
    RESULTS_SORTED, VEHICLE_POSTS_READY
} from '../actions/types';

import {SORT_STYLE, POST_SPECS} from '../constants';

const INITIAL_STATE = {
    vehiclePosts: [],
    sortKey: POST_SPECS.CREATED_AT,
    sortStyle: SORT_STYLE.ASC,
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case VEHICLE_POSTS_READY:
            return {...state, vehiclePosts: payload.vehiclePosts};

        case RESULTS_SORTED:
            const {sortKey, sortStyle, vehiclePosts} = state;

            const {newSortKey} = payload;

            let nextSortStyle = SORT_STYLE.ASC;

            if (newSortKey === sortKey) {
                nextSortStyle = sortStyle === SORT_STYLE.ASC ? SORT_STYLE.DESC : SORT_STYLE.ASC;
            }

            let sortedPosts = _.sortBy(vehiclePosts, post =>{
               return post[newSortKey];
            });

            if(nextSortStyle === SORT_STYLE.DESC){
                _.reverse(sortedPosts);
            }

            return {...state, sortKey: newSortKey, sortStyle: nextSortStyle, vehiclePosts: sortedPosts};


        default:
            return state;
    }
};