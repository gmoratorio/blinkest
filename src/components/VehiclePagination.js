import React from 'react';
import {Row} from 'react-bootstrap';

import _ from 'lodash';

const VehiclePagination = ({isSmallDevice, totalDisplayPostCount, pageSize, currentIndex, currentPage, onClickPage}) => {

    const pageCount = Math.ceil(totalDisplayPostCount / pageSize);

    const returnPrevPageAndIndex = () => {
        const prevPage = (currentPage - 1) > 0 ? currentPage - 1 : 1;
        const prevIndex = prevPage - 1;

        return ({
            page: prevPage,
            index: prevIndex
        });
    };

    const returnNextPageAndIndex = () => {
        const nextPage = (currentPage + 1) <= pageCount ? currentPage + 1 : currentPage;
        const nextIndex = nextPage - 1;

        return ({
            page: nextPage,
            index: nextIndex
        })
    };

    const renderPaginationItems = () => {
        if(isSmallDevice){
            return (
                <div>
                    <li className='page-item' key={currentPage - 1}  ><a className="page-link" onClick={()=>onClickPage(returnPrevPageAndIndex())}>Prev</a></li>
                    <li className='page-item active' key={currentPage}  ><a className="page-link">{currentPage}</a></li>
                    <li className='page-item' key={currentPage + 1}  ><a className="page-link" onClick={()=>onClickPage(returnNextPageAndIndex())}>Next</a></li>
                </div>
            );

        }

        return _.times(pageCount, index => {
            const page = index + 1;
            return (
                <li className={page === currentPage ? 'page-item active' : 'page-item'} key={page}  ><a className="page-link" onClick={()=>onClickPage({page, index})}>{page}</a></li>
            )
        });
    };

    if(!totalDisplayPostCount){
        return (
            <Row>
                <div className="pagination-center">
                    No Results
                </div>
            </Row>
        );
    }

    if(isSmallDevice){
        return (
            <Row>
                <nav className="pagination-center">
                    <ul className="pagination">
                        <li className='page-item' key={'first'}  ><a className="page-link" onClick={()=>onClickPage({page: 1, index: 0})}>First</a></li>
                        <li className='page-item' key={currentPage - 1}  ><a className="page-link" onClick={()=>onClickPage(returnPrevPageAndIndex())}>Prev</a></li>
                        <li className='page-item active' key={currentPage}  ><a className="page-link">{currentPage}</a></li>
                        <li className='page-item' key={currentPage + 1}  ><a className="page-link" onClick={()=>onClickPage(returnNextPageAndIndex())}>Next</a></li>
                        <li className='page-item' key={'last'}  ><a className="page-link" onClick={()=>onClickPage({page: pageCount, index: (pageCount - 1)})}>Last</a></li>
                    </ul>
                </nav>
            </Row>
        );
    }


    return (
        <Row>
            <nav className="pagination-center">
                <ul className="pagination">
                    <li className='page-item' key={'first'}  ><a className="page-link" onClick={()=>onClickPage({page: 1, index: 0})}>First</a></li>
                    {renderPaginationItems()}
                    <li className='page-item' key={'last'}  ><a className="page-link" onClick={()=>onClickPage({page: pageCount, index: (pageCount - 1)})}>Last</a></li>
                </ul>
            </nav>
        </Row>
    );

};




export default VehiclePagination;