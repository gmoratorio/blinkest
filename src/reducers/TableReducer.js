import _ from 'lodash';

import {
    RESULTS_SORTED,
    VEHICLE_POSTS_READY,
    UPDATED_SEARCH_TEXT
} from '../actions/types';

import {SORT_STYLE, POST_SPECS} from '../constants';

const INITIAL_STATE = {
    vehiclePosts: [],
    filteredPosts: [],
    sortKey: POST_SPECS.CREATED_AT,
    sortStyle: SORT_STYLE.ASC,
    searchText: null
};

const sortPosts = ({posts, sortKey, sortOrder}) => {

    let sortedPosts = _.sortBy(posts, post => {
        return post[sortKey];
    });

    if (sortOrder === SORT_STYLE.DESC) {
        _.reverse(sortedPosts);
    }

    return sortedPosts;
};

const filterPosts = ({posts, searchText}) => {
    if (!searchText) {
        return posts;
    }

    const searchArray = _.split(searchText, ' ');

    let filteredPosts = _.filter(posts, post => {
        const prunedPost = _.pick(post, [POST_SPECS.YEAR, POST_SPECS.MAKE, POST_SPECS.MODEL]);

        return _.every(searchArray, (searchEntry) => {
            return !!_.find(prunedPost, (value) =>{
                const attemptedNumberConversion = _.toNumber(searchEntry);

                if(!_.isNaN(attemptedNumberConversion) && _.isNumber(attemptedNumberConversion)){
                    return attemptedNumberConversion === value;
                } else {
                    return _.includes(value, searchEntry);
                }
            });
        });

    });


    return filteredPosts;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case VEHICLE_POSTS_READY:
            return {...state, vehiclePosts: payload.vehiclePosts, filteredPosts: payload.vehiclePosts};

        case RESULTS_SORTED:
            const {sortKey, sortStyle, vehiclePosts} = state;
            const {newSortKey} = payload;

            let nextSortStyle = SORT_STYLE.ASC;
            if (newSortKey === sortKey) {
                nextSortStyle = sortStyle === SORT_STYLE.ASC ? SORT_STYLE.DESC : SORT_STYLE.ASC;
            }

            let sortedPosts = sortPosts({posts: vehiclePosts, sortKey: newSortKey, sortOrder: nextSortStyle});

            return {...state, sortKey: newSortKey, sortStyle: nextSortStyle, vehiclePosts: sortedPosts};

        case UPDATED_SEARCH_TEXT:
            const {newSearchText} = payload;

            let filteredPosts = filterPosts({posts: state.vehiclePosts, searchText: newSearchText});

            return {...state, searchText: newSearchText, filteredPosts: filteredPosts}

        default:
            return state;
    }
};