import axios from 'axios';
import _ from "lodash";

import {
    RESULTS_SORTED,
    VEHICLE_POSTS_READY,
    UPDATED_SEARCH_TEXT,
    VEHICLE_SELECTED,
    CLEAR_SELECTED_VEHICLE,
    PAGE_CHANGE
} from './types';

const vehicleURL = `https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/fa62f0435c2478179e87c469037f2381fa181d80`;

export const loadVehicles = () => {
    return async (dispatch) => {

        try {
            let vehicleResponse = await axios.get(vehicleURL);
            let vehicles = vehicleResponse.data;

            const preparedData = _.map(vehicles, post => {
                const preparedPost = _.reduce(post, (acc, value, key) => {
                    const deserializedKey = _.camelCase(key);

                    acc[deserializedKey] = value;
                    return acc;
                }, {});

                return preparedPost;
            });

            dispatch({
                type: VEHICLE_POSTS_READY,
                payload: {vehiclePosts: preparedData}
            });
        } catch (e) {
            console.log("Something went wrong retrieving the vehicles list...");
        }


    }

};

export const sortDataBy = ({newSortKey}) => {

    return {
        type: RESULTS_SORTED,
        payload: {newSortKey}
    }

};

export const updateSearchValue = ({newSearchText}) => {

    return {
        type: UPDATED_SEARCH_TEXT,
        payload: {newSearchText}
    }
};

export const updateSelectedVehicle = ({selectedVehicle}) => {

    return {
        type: VEHICLE_SELECTED,
        payload: {selectedVehicle}
    }

};

export const clearSelectedVehicle = () => {
    return {
        type: CLEAR_SELECTED_VEHICLE
    }
};

export const changePage = ({page, index}) => {
    return {
        type: PAGE_CHANGE,
        payload: {page, index}
    }
};