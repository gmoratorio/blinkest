import React from 'react';
import _ from "lodash";

import DataRowSmall from './DataRowSmall';
import DataRowLarge from './DataRowLarge';

const Table = ({isSmallDevice, displayedPosts, calendarStrings, onClickVehicleRow}) => {

        return _.map(displayedPosts, (vehicle, index) => {
            const {createdAt, year, make, model, mileage} = vehicle;

            const formattedMiles = Number(mileage).toLocaleString();

            if (isSmallDevice) {
                const combinedName = `${year} ${make} ${model}`;
                const milesWithUnit = `${formattedMiles} mi`;

                return (
                    <DataRowSmall
                        key={index}
                        index={index}
                        vehicleName={combinedName}
                        mileage={milesWithUnit}
                        calendarStrings={calendarStrings}
                        date={createdAt}
                        onClick={onClickVehicleRow}
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
                    mileage={formattedMiles}
                    calendarStrings={calendarStrings}
                    date={createdAt}
                    onClick={onClickVehicleRow}
                />
            );
        })

};

export default Table;