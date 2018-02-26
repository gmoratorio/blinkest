import React from 'react';
import {Row, Col, FormControl} from 'react-bootstrap';

const TitleAndSearch = ({isSmallDevice, searchText, onSearchInputChange}) => {

    return (
        <Row>
            <Col className={isSmallDevice ? 'table-heading-small col-6' : 'table-heading col-6'}>
                Available Vehicles
            </Col>

            <Col className="col-6 search-container">
                <FormControl
                    value={searchText}
                    onChange={onSearchInputChange}
                    className="filter-search" type="text"
                    placeholder="Search"
                />
            </Col>
        </Row>
    );

};


export default TitleAndSearch;