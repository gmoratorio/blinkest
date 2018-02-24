import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import _ from 'lodash';
import Moment from 'react-moment';

import './components.css';
import 'bootstrap/dist/css/bootstrap.css';

import {updateWindowDimensions, sortDataBy, loadVehicles} from '../actions';

import {POST_SPECS} from '../constants';

class BlinkestIndex extends Component {

    componentWillMount() {
        this.props.loadVehicles();
    }

    componentDidMount() {
        this.props.updateWindowDimensions();

        window.addEventListener('resize', this.props.updateWindowDimensions);
    }

    onClickSort = (newSortKey) => {
        const {sortStyle, sortKey} = this.props;

        this.props.sortDataBy({currentSortStyle: sortStyle, currentSortKey: sortKey, newSortKey});
    };

    renderTable = () => {

        const {vehiclePosts} = this.props;

        if (vehiclePosts.length === 0) {
            return (
                <div className="text-center">
                    <h3 className="table-heading">Loading...</h3>
                </div>
            );
        }

        const isSmallDevice = this.props.windowWidth < 768;

        if (isSmallDevice) {
            return (
                <div>
                    <h3 className="table-heading">Available Vehicles</h3>

                    <div className="table-container">
                        <Grid>
                            {this.renderVehicles()}
                        </Grid>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h3 className="table-heading">Available Vehicles</h3>

                <div className="table-container">
                    <Grid>
                        <Row className="hidden-sm-down vehicle-row header-row">
                            <Col md={2}><a href="#" className="table-header-title">Year</a></Col>
                            <Col md={2}><a href="#" className="table-header-title">Make</a></Col>
                            <Col md={2}><a href="#" className="table-header-title">Model</a></Col>
                            <Col md={3}><a href="#" className="table-header-title">Mileage</a></Col>
                            <Col md={3}><a href="#" className="table-header-title">Posted</a></Col>
                        </Row>
                        {this.renderVehicles()}
                    </Grid>
                </div>
            </div>
        );
    };

    renderVehicles = () => {
        const {vehiclePosts} = this.props;

        return _.map(vehiclePosts, (car, index) => {
            const {created_at, year, make, model, mileage} = car;

            const formattedMiles = Number(mileage).toLocaleString();

            const calendarStrings = {
                lastDay: '[Yesterday at] LT',
                sameDay: '[Today at] LT',
                lastWeek: '[last] dddd [at] LT',
                sameElse: 'L'
            };

            const isSmallDevice = this.props.windowWidth < 768;

            if (isSmallDevice) {
                const combinedName = `${year} ${make} ${model}`;
                const milesWithUnit = `${formattedMiles} mi`;

                return (
                    <Link to="/" key={index}>
                        <Row className="top-small-row">
                            <Col className="smartphone-text col-12"><span>{combinedName}</span></Col>
                        </Row>

                        <Row className="bottom-small-row">
                            <Col className="smartphone-text col-4"><span>{milesWithUnit}</span></Col>
                            <Col className="smartphone-text col-8">
                                    <span>
                                        <Moment
                                            calendar={calendarStrings}
                                            date={created_at}
                                        />
                                    </span>
                            </Col>
                        </Row>
                    </Link>
                );
            }

            return (
                <Link to="/" key={index}>
                    <Row className="vehicle-row">
                        <Col className="table-text col-sm-2"><span>{year}</span></Col>
                        <Col className="table-text col-sm-2"><span>{make}</span></Col>
                        <Col className="table-text col-sm-2"><span>{model}</span></Col>
                        <Col className="table-text col-sm-3"><span>{formattedMiles}</span></Col>
                        <Col className="table-text col-sm-3">
                             <span>
                                <Moment
                                    calendar={calendarStrings}
                                    date={created_at}
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
    const {windowWidth, windowHeight, vehiclePosts} = state.bootstrap;
    const {sortStyle, sortKey} = state.table;

    return {windowWidth, windowHeight, vehiclePosts, sortStyle, sortKey};
}

export default connect(mapStateToProps, {updateWindowDimensions, sortDataBy, loadVehicles})(BlinkestIndex);