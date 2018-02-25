import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import Moment from 'react-moment';

const DataRowSmall = ({index, vehicleName, mileage, calendarStrings, date, onClick}) => {

    return (
        <Link to="/detail" className="data-row disable-link-style" onClick={() => {
            onClick(index)
        }}>
            <Row className="top-small-row">
                <Col className="smartphone-text col-12"><span>{vehicleName}</span></Col>
            </Row>

            <Row className="bottom-small-row">
                <Col className="smartphone-text col-6"><span>{mileage}</span></Col>
                <Col className="smartphone-text col-6">
                                    <span>
                                        <Moment
                                            calendar={calendarStrings}
                                            date={date}
                                        />
                                    </span>
                </Col>
            </Row>
        </Link>
    );

};


export default DataRowSmall;