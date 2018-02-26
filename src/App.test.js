import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
    sortDataBy,
    updateSearchValue,
    updateSelectedVehicle,
    updateWindowDimensions
} from './actions';

import TableReducer from './reducers/TableReducer';
import BootstrapReducer from './reducers/BootstrapReducer';

import {
    RESULTS_SORTED,
    UPDATED_SEARCH_TEXT,
    VEHICLE_SELECTED,
    UPDATED_DIMENSIONS,
    VEHICLE_POSTS_READY
} from "./actions/types";

import {POST_SPECS, SORT_STYLE} from "./constants";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


describe('Given a set of TableActions', () => {
    describe('when we call sortDataBy with a newSortKey', () => {
        it('then it should dispatch that newSortKey', () => {
            const expectedReturn = {
                type: RESULTS_SORTED,
                payload: {newSortKey: 'year'}
            };

            const sortDispatch = sortDataBy({newSortKey: 'year'});

            expect(sortDispatch).toEqual(expectedReturn);
        });
    });

    describe('when we enter a search phrase', () => {
        it('then it should dispatch that phrase', () => {
            const expectedReturn = {
                type: UPDATED_SEARCH_TEXT,
                payload: {newSearchText: 'some search'}
            };

            const searchDispatch = updateSearchValue({newSearchText: 'some search'});

            expect(searchDispatch).toEqual(expectedReturn);
        });
    });

    describe('when we select a new vehicle', () => {
        it('then it should dispatch the selectedVehicle', () => {
            const selectedVehicle = {
                year: 2015,
                make: "Subaru",
                model: "Forester",
                mileage: 47893,
                drivetrain: "AWD",
                bodytype: "sedan",
                imageUrl: "http://st.motortrend.com/uploads/sites/10/2015/11/2015-subaru-forester-25-i-suv-angular-front1.png",
                createdAt: "2016-10-14T20:13:22.586Z"
            };

            const expectedReturn = {
                type: VEHICLE_SELECTED,
                payload: {selectedVehicle}
            };

            const searchDispatch = updateSelectedVehicle({selectedVehicle});

            expect(searchDispatch).toEqual(expectedReturn);
        });
    });
});

describe('Given a set of BootstrapActions', () => {
    describe('when we call updateWindowDimensions', () => {
        it('then it should dispatch the latest window dimensions', () => {
            window.innerHeight = 1000;
            window.innerWidth = 1080;

            const expectedReturn = {
                type: UPDATED_DIMENSIONS,
                payload: {
                    windowHeight: 1000,
                    windowWidth: 1080
                }
            };

            const sortDispatch = updateWindowDimensions();

            expect(sortDispatch).toEqual(expectedReturn);
        });
    });
});

describe('Given a BootstrapReducer', () => {
    describe('when the BootstrapReducer receives an action', () => {
        it('then it should return the current state by default', () => {
            const expectedState = {
                windowWidth: 0,
                windowHeight: 0
            };

            const returnedState = BootstrapReducer(undefined, {});

            expect(returnedState).toEqual(expectedState);
        });

        it('then it should return the UPDATED_DIMENSIONS', () => {
            const passedAction = {
                type: UPDATED_DIMENSIONS,
                payload: {
                    windowWidth: 1234,
                    windowHeight: 4242
                }
            };

            const expectedState = {
                windowWidth: 1234,
                windowHeight: 4242
            };

            const returnedState = BootstrapReducer([], passedAction);

            expect(returnedState).toEqual(expectedState);
        });
    });
});

describe('Given a TableReducer', () => {
    describe('when the TableReducer receives an action', () => {
        let posts = [];
        let initialState = {};
        let initializedState = {};

        beforeEach(() => {
            posts = [
                {
                    year: 2013,
                    make: "Kia",
                    model: "Optima",
                    mileage: 24235,
                    drivetrain: "FWD",
                    bodytype: "sedan",
                    imageUrl: "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                },
                {
                    year: 2013,
                    make: "Hyundai",
                    model: "Accent",
                    mileage: 21587,
                    drivetrain: "FWD",
                    bodytype: "sedan",
                    imageUrl: "http://www.conceptcarz.com/images/Hyundai/2013-Hyundai-Accent-Sedan-Image-01.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                },
                {
                    year: 2014,
                    make: "Nissan",
                    model: "Juke",
                    mileage: 10457,
                    drivetrain: "FWD",
                    bodytype: "CUV",
                    imageUrl: "http://www.automobilesreview.com/gallery/2014-nissan-juke-nismo-rs/2014-nissan-juke-nismo-rs-08.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                }];
            initialState = {
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

            initializedState = {
                vehiclePosts: posts,
                displayedPosts: posts,
                sortKey: POST_SPECS.CREATED_AT,
                sortStyle: SORT_STYLE.ASC,
                searchText: '',
                postsReady: true,
                selectedVehicle: {},
                currentPage: 1,
                currentIndex: 0
            };
        });

        afterEach(() => {

        });


        it('then it should return the current state by default', () => {
            const returnedState = TableReducer(initialState, {});

            expect(returnedState).toEqual(initialState);
        });

        it('then it should return the correct state when VEHICLE_POSTS_READY', () => {
            const passedAction = {
                type: VEHICLE_POSTS_READY,
                payload: {
                    vehiclePosts: posts
                }
            };

            const expectedState = {
                ...initialState,
                vehiclePosts: posts,
                displayedPosts: posts,
                postsReady: true
            };

            const returnedState = TableReducer(initialState, passedAction);

            expect(returnedState).toEqual(expectedState);
        });

        it('then it should return the correct state when the vehicle RESULTS_SORTED', () => {
            const passedAction = {
                type: RESULTS_SORTED,
                payload: {
                    newSortKey: POST_SPECS.MILEAGE
                }
            };

            const sortedPosts = [
                {
                    year: 2014,
                    make: "Nissan",
                    model: "Juke",
                    mileage: 10457,
                    drivetrain: "FWD",
                    bodytype: "CUV",
                    imageUrl: "http://www.automobilesreview.com/gallery/2014-nissan-juke-nismo-rs/2014-nissan-juke-nismo-rs-08.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                },
                {
                    year: 2013,
                    make: "Hyundai",
                    model: "Accent",
                    mileage: 21587,
                    drivetrain: "FWD",
                    bodytype: "sedan",
                    imageUrl: "http://www.conceptcarz.com/images/Hyundai/2013-Hyundai-Accent-Sedan-Image-01.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                },
                {
                    year: 2013,
                    make: "Kia",
                    model: "Optima",
                    mileage: 24235,
                    drivetrain: "FWD",
                    bodytype: "sedan",
                    imageUrl: "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                }];

            const expectedState = {
                ...initializedState,
                sortKey: POST_SPECS.MILEAGE,
                sortStyle: SORT_STYLE.ASC,
                displayedPosts: sortedPosts
            };

            const returnedState = TableReducer(initializedState, passedAction);

            expect(returnedState).toEqual(expectedState);
        });

        it('then it should return the correct state when we search and UPDATED_SEARCH_TEXT is fired', () => {
            const passedAction = {
                type: UPDATED_SEARCH_TEXT,
                payload: {
                    newSearchText: '2013 kia'
                }
            };

            const filteredPosts = [
                {
                    year: 2013,
                    make: "Kia",
                    model: "Optima",
                    mileage: 24235,
                    drivetrain: "FWD",
                    bodytype: "sedan",
                    imageUrl: "http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg",
                    createdAt: "2016-10-14T20:13:22.586Z"
                }];

            const expectedState = {
                ...initializedState,
                searchText: '2013 kia',
                displayedPosts: filteredPosts
            };

            const returnedState = TableReducer(initializedState, passedAction);

            expect(returnedState).toEqual(expectedState);
        });

        it('then it should return the correct state when VEHICLE_SELECTED', () => {
            const selectedVehicle = {
                year: 2014,
                make: "Nissan",
                model: "Juke",
                mileage: 10457,
                drivetrain: "FWD",
                bodytype: "CUV",
                imageUrl: "http://www.automobilesreview.com/gallery/2014-nissan-juke-nismo-rs/2014-nissan-juke-nismo-rs-08.jpg",
                createdAt: "2016-10-14T20:13:22.586Z"
            };

            const passedAction = {
                type: VEHICLE_SELECTED,
                payload: {
                    selectedVehicle
                }
            };

            const expectedState = {
                ...initializedState,
                selectedVehicle
            };

            const returnedState = TableReducer(initializedState, passedAction);

            expect(returnedState).toEqual(expectedState);
        });
    });
});
