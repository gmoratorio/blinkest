import React from 'react';
import Octicon from 'react-octicon';

const ColumnHeader = ({headerText, columnName, sortKey, sortStyle, sortStyles}) => {

    if (columnName !== sortKey) {
        return (
            <span>
                {headerText}
            </span>
        );
    } else {

        return (
            <span className="selected-column">
                {headerText}
                <Octicon className="sort-icon" name={sortStyle === sortStyles.ASC ? 'arrow-up' : 'arrow-down'}/>
            </span>
        );
    }

};


export default ColumnHeader;