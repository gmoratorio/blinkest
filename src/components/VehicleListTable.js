import React from 'react';
import {Grid} from 'react-bootstrap';

import _ from 'lodash';
import Octicon from 'react-octicon';

import TitleAndSearch from './TitleAndSearch';
import DataRowHeader from './DataRowHeader';
import Table from './Table';
import VehiclePagination from './VehiclePagination';

const VehicleListTable = ({isSmallDevice, postsReady, onClickSort, sortStyle, sortStyles, sortKey, postSpecs, postTextTemplates, calendarStrings, displayedPosts, onClickVehicleRow, searchText, onSearchInputChange, pageSize, currentPage, currentIndex, onClickPage}) => {

    const paginatedPosts = _.chunk(displayedPosts, pageSize);
    const currentPageOfPosts = paginatedPosts[currentIndex];

    if (!postsReady) {
        return (
            <div className="text-center">
                <h3 className="table-heading">Loading...</h3>
                <Octicon className="spinner-large" spin name="sync"/>
            </div>
        );
    }

    return (

        <Grid>
            <TitleAndSearch
                isSmallDevice={isSmallDevice}
                searchText={searchText}
                onSearchInputChange={onSearchInputChange}
            />

            <DataRowHeader
                isSmallDevice={isSmallDevice}
                onClickSort={onClickSort}
                postSpecs={postSpecs}
                sortStyle={sortStyle}
                sortKey={sortKey}
                sortStyles={sortStyles}
                postTextTemplates={postTextTemplates}
            />

            <Table
                isSmallDevice={isSmallDevice}
                displayedPosts={currentPageOfPosts}
                calendarStrings={calendarStrings}
                onClickVehicleRow={onClickVehicleRow}
            />

            <VehiclePagination
                isSmallDevice={isSmallDevice}
                totalDisplayPostCount={displayedPosts.length}
                pageSize={pageSize}
                onClickPage={onClickPage}
                currentPage={currentPage}
                currentIndex={currentIndex}
            />
        </Grid>

    );

};


export default VehicleListTable;