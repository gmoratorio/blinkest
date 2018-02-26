import React, {Component} from 'react';
import {connect} from 'react-redux';
import Octicon from 'react-octicon';

import './components.css';
import 'bootstrap/dist/css/bootstrap.css';

import {updateWindowDimensions, sortDataBy, loadVehicles, updateSearchValue, updateSelectedVehicle, changePage} from '../actions';

import {POST_SPECS, SORT_STYLE, CALENDAR_STRINGS, PAGE_SIZE} from '../constants';
import {posts} from '../locale.en';

import VehicleListTable from './VehicleListTable';

class BlinkestIndex extends Component {

    componentWillMount() {
        this.props.loadVehicles();
    }

    componentDidMount() {
        this.props.updateWindowDimensions();

        window.addEventListener('resize', this.props.updateWindowDimensions);
    }

    onClickSort = (newSortKey) => {
        this.props.sortDataBy({newSortKey});
    };

    onSearchInputChange = (event) => {
        const newSearchText = event.target.value;

        this.props.updateSearchValue({newSearchText});
    };

    onClickVehicleRow = (index) => {
        const {displayedPosts, currentPage} = this.props;
        const trueIndex = (PAGE_SIZE * (currentPage - 1)) + index;

        const selectedVehicle = displayedPosts[trueIndex];

        this.props.updateSelectedVehicle({selectedVehicle});
    };

    onClickPage = ({page, index}) =>{
        this.props.changePage({page, index})
    };

    render() {
        const {windowWidth, postsReady, sortStyle, sortKey, displayedPosts, searchText, currentPage, currentIndex} = this.props;
        const isSmallDevice = windowWidth < 768;

        return (
            <div className="container main-container">
                <h1 className={isSmallDevice ? 'text-center main-heading-small' : 'text-center main-heading'}>
                    Welcome to Blinkest!
                </h1>


                <VehicleListTable
                    isSmallDevice={isSmallDevice}
                    postsReady={postsReady}
                    sortStyle={sortStyle}
                    sortKey={sortKey}
                    sortStyles={SORT_STYLE}
                    postSpecs={POST_SPECS}
                    onClickSort={this.onClickSort}
                    postTextTemplates={posts}
                    calendarStrings={CALENDAR_STRINGS}
                    displayedPosts={displayedPosts}
                    onClickVehicleRow={this.onClickVehicleRow}
                    searchText={searchText}
                    onSearchInputChange={this.onSearchInputChange}
                    pageSize={PAGE_SIZE}
                    onClickPage={this.onClickPage}
                    currentPage={currentPage}
                    currentIndex={currentIndex}
                />
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {windowWidth, windowHeight} = state.bootstrap;
    const {sortStyle, sortKey, displayedPosts, searchText, postsReady, currentPage, currentIndex} = state.table;

    return {windowWidth, windowHeight, displayedPosts, sortStyle, sortKey, searchText, postsReady, currentPage, currentIndex};
}

export default connect(mapStateToProps, {
    updateWindowDimensions,
    sortDataBy,
    loadVehicles,
    updateSearchValue,
    updateSelectedVehicle,
    changePage
})(BlinkestIndex);