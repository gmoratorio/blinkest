import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button, FormControl} from 'react-bootstrap';
import Octicon from 'react-octicon'

import _ from 'lodash';
import Moment from 'react-moment';

import './components.css';
import 'bootstrap/dist/css/bootstrap.css';

import {updateWindowDimensions, sortDataBy, loadVehicles, updateSearchValue, updateSelectedVehicle} from '../actions';

import {POST_SPECS, SORT_STYLE, CALENDAR_STRINGS} from '../constants';
import {posts} from '../locale.en';

class BlinkestIndex extends Component {

    componentWillMount() {
        this.props.loadVehicles();
    }

    componentDidMount() {
        this.props.updateWindowDimensions();

        window.addEventListener('resize', this.props.updateWindowDimensions);
    }

    renderColumnHeader = (columnName) => {
        const {sortStyle, sortKey} = this.props;
        const {postDetail, postDetailShort} = posts;

        const isSmallDevice = this.props.windowWidth < 768;

        const constForStrings = isSmallDevice ? postDetailShort : postDetail;
        const textValue = constForStrings[columnName];

        if (columnName !== sortKey) {
            return (
                <span>
                    {textValue}
                </span>
            );
        } else {

            return (
                <span className="selected-column">
                    {textValue}
                    <Octicon className="sort-icon" name={sortStyle === SORT_STYLE.ASC ? 'arrow-up' : 'arrow-down'}/>
                </span>
            );
        }

    };

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

    renderTable = () => {
        const {searchText, windowWidth, postsReady} = this.props;

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
                <Grid>
                    <Row>
                        <Col className={isSmallDevice ? 'table-heading-small col-6' : 'table-heading col-6'}>Available
                            Vehicles</Col>

                        <Col className="col-6 search-container">
                            <FormControl
                                value={searchText}
                                onChange={this.onSearchInputChange}
                                className="filter-search" type="text"
                                placeholder="Search"
                            />
                        </Col>
                    </Row>
                </Grid>

                <div className="table-container">
                    <Grid>
                        <Row className={isSmallDevice ? 'vehicle-row-small header-row' : 'vehicle-row header-row'}>
                            <Col className={isSmallDevice ? 'col-2 offset-1' : 'col-md-2'}>
                                <Button
                                    onClick={() => {
                                        this.onClickSort(POST_SPECS.YEAR)
                                    }}
                                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                                >
                                    {this.renderColumnHeader(POST_SPECS.YEAR)}
                                </Button>
                            </Col>

                            <Col className={isSmallDevice ? 'col-2' : 'col-md-2'}>
                                <Button
                                    onClick={() => {
                                        this.onClickSort(POST_SPECS.MAKE)
                                    }}
                                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                                >
                                    {this.renderColumnHeader(POST_SPECS.MAKE)}
                                </Button>
                            </Col>

                            <Col className={isSmallDevice ? 'col-2' : 'col-md-2'}>
                                <Button
                                    onClick={() => {
                                        this.onClickSort(POST_SPECS.MODEL)
                                    }}
                                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                                >
                                    {this.renderColumnHeader(POST_SPECS.MODEL)}
                                </Button>
                            </Col>

                            <Col className={isSmallDevice ? 'col-2' : 'col-md-3'}>
                                <Button
                                    onClick={() => {
                                        this.onClickSort(POST_SPECS.MILEAGE)
                                    }}

                                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                                >
                                    {this.renderColumnHeader(POST_SPECS.MILEAGE)}
                                </Button>
                            </Col>

                            <Col className={isSmallDevice ? 'col-2' : 'col-md-3'}>
                                <Button
                                    onClick={() => {
                                        this.onClickSort(POST_SPECS.CREATED_AT)
                                    }}
                                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                                >
                                    {this.renderColumnHeader(POST_SPECS.CREATED_AT)}
                                </Button>
                            </Col>
                        </Row>


                        {this.renderVehicles()}
                    </Grid>
                </div>
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
                    <Link to="/detail" className="data-row" key={index} onClick={() => {
                        this.onClickVehicleRow(index)
                    }}>
                        <Row className="top-small-row">
                            <Col className="smartphone-text col-12"><span>{combinedName}</span></Col>
                        </Row>

                        <Row className="bottom-small-row">
                            <Col className="smartphone-text col-6"><span>{milesWithUnit}</span></Col>
                            <Col className="smartphone-text col-6">
                                    <span>
                                        <Moment
                                            calendar={CALENDAR_STRINGS}
                                            date={createdAt}
                                        />
                                    </span>
                            </Col>
                        </Row>
                    </Link>
                );
            }

            return (
                <Link to="/detail" key={index}>
                    <Row className="vehicle-row data-row" onClick={() => {
                        this.onClickVehicleRow(index)
                    }}>
                        <Col className="table-text col-sm-2"><span>{year}</span></Col>
                        <Col className="table-text col-sm-2"><span>{make}</span></Col>
                        <Col className="table-text col-sm-2"><span>{model}</span></Col>
                        <Col className="table-text col-sm-3"><span>{formattedMiles}</span></Col>
                        <Col className="table-text col-sm-3">
                             <span>
                                <Moment
                                    calendar={CALENDAR_STRINGS}
                                    date={createdAt}
                                />
                            </span>
                        </Col>
                    </Row>
                </Link>
            );
        })
    };

    render() {

        return (
            <div className="container main-container">
                <h1 className="text-center main-heading">Welcome to Blinkest!</h1>

                {this.renderTable()}
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