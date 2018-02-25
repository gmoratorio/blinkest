import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, FormControl} from 'react-bootstrap';
import Octicon from 'react-octicon';

import _ from 'lodash';

import './components.css';
import 'bootstrap/dist/css/bootstrap.css';

import {updateWindowDimensions, sortDataBy, loadVehicles, updateSearchValue, updateSelectedVehicle} from '../actions';

import {POST_SPECS, SORT_STYLE, CALENDAR_STRINGS} from '../constants';
import {posts} from '../locale.en';

import DataRowSmall from './DataRowSmall';
import DataRowLarge from './DataRowLarge';
import DataRowHeader from './DataRowHeader';

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
        const {displayedPosts} = this.props;
        const selectedVehicle = displayedPosts[index];

        this.props.updateSelectedVehicle({selectedVehicle});
    };

    renderTitleAndSearch = () => {
        const {searchText, windowWidth} = this.props;

        const isSmallDevice = windowWidth < 768;

        return (
            <Row>
                <Col className={isSmallDevice ? 'table-heading-small col-6' : 'table-heading col-6'}>
                    Available Vehicles
                </Col>

                <Col className="col-6 search-container">
                    <FormControl
                        value={searchText}
                        onChange={this.onSearchInputChange}
                        className="filter-search" type="text"
                        placeholder="Search"
                    />
                </Col>
            </Row>
        );
    };

    renderTable = () => {
        const {windowWidth, postsReady, sortStyle, sortKey} = this.props;

        if (!postsReady) {
            return (
                <div className="text-center">
                    <h3 className="table-heading">Loading...</h3>
                    <Octicon className="spinner-large" spin name="sync"/>
                </div>
            );
        }

        const isSmallDevice = windowWidth < 768;

        return (

            <div>
                <DataRowHeader
                    isSmallDevice={isSmallDevice}
                    onClickSort={this.onClickSort}
                    postSpecs={POST_SPECS}
                    sortStyle={sortStyle}
                    sortKey={sortKey}
                    sortStyles={SORT_STYLE}
                    postTextTemplates={posts}
                />

                {this.renderVehicles()}
            </div>

        );
    };

    renderVehicles = () => {
        const {displayedPosts} = this.props;

        return _.map(displayedPosts, (car, index) => {
            const {createdAt, year, make, model, mileage} = car;

            const formattedMiles = Number(mileage).toLocaleString();

            const isSmallDevice = this.props.windowWidth < 768;

            if (isSmallDevice) {
                const combinedName = `${year} ${make} ${model}`;
                const milesWithUnit = `${formattedMiles} mi`;

                return (
                    <DataRowSmall
                        key={index}
                        index={index}
                        vehicleName={combinedName}
                        mileage={milesWithUnit}
                        calendarStrings={CALENDAR_STRINGS}
                        date={createdAt}
                        onClick={this.onClickVehicleRow}
                    />
                );
            }

            return (
                <DataRowLarge
                    key={index}
                    index={index}
                    make={make}
                    model={model}
                    year={year}
                    mileage={mileage}
                    calendarStrings={CALENDAR_STRINGS}
                    date={createdAt}
                    onClick={this.onClickVehicleRow}
                />
            );
        })
    };

    render() {
        const isSmallDevice = this.props.windowWidth < 768;

        return (
            <div className="container main-container">
                <h1 className={isSmallDevice ? 'text-center main-heading-small' : 'text-center main-heading'}>
                    Welcome to Blinkest!
                </h1>

                <Grid>
                    {this.renderTitleAndSearch()}

                    {this.renderTable()}
                </Grid>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {windowWidth, windowHeight} = state.bootstrap;
    const {sortStyle, sortKey, displayedPosts, searchText, postsReady} = state.table;

    return {windowWidth, windowHeight, displayedPosts, sortStyle, sortKey, searchText, postsReady};
}

export default connect(mapStateToProps, {
    updateWindowDimensions,
    sortDataBy,
    loadVehicles,
    updateSearchValue,
    updateSelectedVehicle
})(BlinkestIndex);