import React from 'react';
import {CButton, CButtonGroup} from '@coreui/react';
import useDateFilter from '../hooks/useDateFilter';
import DateFilterEnum from "../../../constants/dateFilterEnum";

const DateFilter = () => {
    const {selectedDateFilter, changeDateFilter} = useDateFilter();

    return (
        <CButtonGroup>
            {Object.values(DateFilterEnum).map((filter) => (
                <CButton
                    key={filter}
                    color="primary"
                    variant="outline"
                    active={selectedDateFilter === filter}
                    onClick={() => changeDateFilter(filter)}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </CButton>
            ))}
        </CButtonGroup>
    );
};

export default DateFilter;