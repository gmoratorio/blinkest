import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import ColumnHeader from './ColumnHeader';

const DataRowHeader = ({isSmallDevice, onClickSort, postSpecs, postTextTemplates, sortKey, sortStyle, sortStyles}) => {

    const {postDetail, postDetailShort} = postTextTemplates;
    const constForStrings = isSmallDevice ? postDetailShort : postDetail;

    return (
        <Row className={isSmallDevice ? 'vehicle-header-row-small header-row' : 'vehicle-row header-row'}>
            <Col className={isSmallDevice ? 'col-2 offset-1' : 'col-md-2'}>
                <Button
                    onClick={() => {
                        onClickSort(postSpecs.YEAR)
                    }}
                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                >

                    <ColumnHeader
                        columnName={postSpecs.YEAR}
                        headerText={constForStrings[postSpecs.YEAR]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={isSmallDevice ? 'col-2' : 'col-md-2'}>
                <Button
                    onClick={() => {
                        onClickSort(postSpecs.MAKE)
                    }}
                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                >
                    <ColumnHeader
                        columnName={postSpecs.MAKE}
                        headerText={constForStrings[postSpecs.MAKE]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={isSmallDevice ? 'col-2' : 'col-md-2'}>
                <Button
                    onClick={() => {
                        onClickSort(postSpecs.MODEL)
                    }}
                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                >
                    <ColumnHeader
                        columnName={postSpecs.MODEL}
                        headerText={constForStrings[postSpecs.MODEL]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={isSmallDevice ? 'col-2' : 'col-md-3'}>
                <Button
                    onClick={() => {
                        onClickSort(postSpecs.MILEAGE)
                    }}

                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                >
                    <ColumnHeader
                        columnName={postSpecs.MILEAGE}
                        headerText={constForStrings[postSpecs.MILEAGE]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={isSmallDevice ? 'col-2' : 'col-md-3'}>
                <Button
                    onClick={() => {
                        onClickSort(postSpecs.CREATED_AT)
                    }}
                    className={isSmallDevice ? 'table-header-title-small' : 'table-header-title'}
                >
                    <ColumnHeader
                        columnName={postSpecs.CREATED_AT}
                        headerText={constForStrings[postSpecs.CREATED_AT]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>
        </Row>
    );

};


export default DataRowHeader;