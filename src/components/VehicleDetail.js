import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Grid, Row, Col, Thumbnail, Button, Image} from 'react-bootstrap';

import _ from 'lodash';
import Moment from 'react-moment';

import {CALENDAR_STRINGS} from '../constants';
import fallbackImage from '../assets/image_unavailable.jpg';

class VehicleDetail extends Component {

    handleImageError = (event) => {
        console.log(event);
        event.target.setAttribute('src', fallbackImage);
    };

    renderDetail() {
        const {selectedVehicle} = this.props;

        const {createdAt, year, make, model, mileage, drivetrain = '', bodytype = '', imageUrl} = selectedVehicle;

        const formattedMiles = Number(mileage).toLocaleString();
        const combinedName = `${year} ${make} ${model}`;
        const milesWithUnit = `${formattedMiles} mi`;
        const fullDescription = drivetrain || bodytype ? `${drivetrain} ${bodytype} - ${milesWithUnit}` : milesWithUnit;
        const postDateDetail = `Posted on: `;

        return (
            <Grid>
                <Row>
                    <Col className="col-12">
                        <Thumbnail>
                            <Image src={imageUrl} responsive className="thumbnail" onError={this.handleImageError}/>
                            <h2>{combinedName}</h2>
                            <h5>{fullDescription}</h5>
                            <p>{postDateDetail}
                                <span>
                                    <Moment
                                        calendar={CALENDAR_STRINGS}
                                        date={createdAt}
                                    />
                                </span>
                            </p>

                            <p>
                                <Button bsStyle="primary"><Link to="/" className="back-button">Back to
                                    List</Link></Button>
                            </p>
                        </Thumbnail>
                    </Col>
                </Row>
            </Grid>
        );
    }

    render() {
        if (_.isEmpty(this.props.selectedVehicle)) {
            return (<Redirect to="/"/>)
        }

        return (
            <div className="container details-main-container">
                {this.renderDetail()}
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    const {windowWidth, windowHeight} = state.bootstrap;
    const {selectedVehicle} = state.table;

    return {windowWidth, windowHeight, selectedVehicle};
};


export default connect(mapStateToProps, {})(VehicleDetail);

