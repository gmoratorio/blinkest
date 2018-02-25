import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import Moment from 'react-moment';

const DataRowLarge = ({index, year, make, model, mileage, calendarStrings, date, onClick}) => {

    return (
        <Link to="/detail" className="data-row disable-link-style">
            <Row className="vehicle-row" onClick={() => {
                onClick(index)
            }}>
                <Col className="table-text col-sm-2"><span>{year}</span></Col>
                <Col className="table-text col-sm-2"><span>{make}</span></Col>
                <Col className="table-text col-sm-2"><span>{model}</span></Col>
                <Col className="table-text col-sm-3"><span>{mileage}</span></Col>
                <Col className="table-text col-sm-3">
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


export default DataRowLarge;