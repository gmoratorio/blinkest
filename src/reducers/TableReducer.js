import _ from 'lodash';

import {
    RESULTS_SORTED,
    VEHICLE_POSTS_READY,
    UPDATED_SEARCH_TEXT,
    VEHICLE_SELECTED,
    CLEAR_SELECTED_VEHICLE,
    PAGE_CHANGE
} from '../actions/types';

import {SORT_STYLE, POST_SPECS} from '../constants';

const INITIAL_STATE = {
    vehiclePosts: [],
    displayedPosts: [],
    sortKey: POST_SPECS.CREATED_AT,
    sortStyle: SORT_STYLE.ASC,
    searchText: '',
    postsReady: false,
    selectedVehicle: {},
    currentPage: 1,
    currentIndex: 0
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

const filterPosts = ({posts, searchText, sortKey, sortOrder}) => {
    if (!searchText) {
        return sortPosts({posts, sortKey, sortOrder});
    }

    const searchArray = _.split(searchText, ' ');

    let filteredPosts = _.filter(posts, post => {
        const prunedPost = _.pick(post, [POST_SPECS.YEAR, POST_SPECS.MAKE, POST_SPECS.MODEL]);

        return _.every(searchArray, (searchEntry) => {
            return !!_.find(prunedPost, (value) => {
                const attemptedNumberConversion = _.toNumber(searchEntry);

                if (!_.isNaN(attemptedNumberConversion) && _.isNumber(attemptedNumberConversion)) {
                    return attemptedNumberConversion === value;
                } else {
                    return _.includes(_.lowerCase(value), _.lowerCase(searchEntry));
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
            let initialSortedPosts = sortPosts({
                posts: payload.vehiclePosts,
                sortKey: state.sortKey,
                sortOrder: state.sortOrder
            });

            return {
                ...state,
                vehiclePosts: initialSortedPosts,
                displayedPosts: initialSortedPosts,
                postsReady: true
            };

        case RESULTS_SORTED:
            const {sortKey, sortStyle, displayedPosts} = state;
            const {newSortKey} = payload;

            let nextSortStyle = SORT_STYLE.ASC;
            if (newSortKey === sortKey) {
                nextSortStyle = sortStyle === SORT_STYLE.ASC ? SORT_STYLE.DESC : SORT_STYLE.ASC;
            }

            let sortedPosts = sortPosts({posts: displayedPosts, sortKey: newSortKey, sortOrder: nextSortStyle});

            return {
                ...state,
                sortKey: newSortKey,
                sortStyle: nextSortStyle,
                displayedPosts: sortedPosts,
                currentPage: 1,
                currentIndex: 0
            };

        case UPDATED_SEARCH_TEXT:
            const {newSearchText} = payload;

            let filteredPosts = filterPosts({
                posts: state.vehiclePosts,
                searchText: newSearchText,
                sortKey: state.sortKey,
                sortOrder: state.sortOrder
            });

            return {
                ...state,
                searchText: newSearchText,
                displayedPosts: filteredPosts,
                currentPage: 1,
                currentIndex: 0
            };

        case VEHICLE_SELECTED:
            const {selectedVehicle} = payload;
            return {...state, selectedVehicle};

        case CLEAR_SELECTED_VEHICLE:
            return INITIAL_STATE;

        case PAGE_CHANGE:
            const {page, index} = payload;
            return {...state, currentPage: page, currentIndex: index};

        default:
            return state;
    }
};