import React, {useState} from 'react';
import {CButton, CButtonGroup, CInputGroup} from '@coreui/react';
import DatePicker from 'react-datepicker';
import {addMonths, subMonths} from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import useDateFilter from '../hooks/useDateFilter';
import PeriodEnum from "../../../constants/periodEnum";
import './DateFilter.scss'

const DateFilter = () => {
    const {selectedDateFilter, changeDateFilter} = useDateFilter();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const handlePreviousMonth = () => {
        const newDate = subMonths(selectedDate, 1);
        setSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = addMonths(selectedDate, 1);
        setSelectedDate(newDate);
    };

    return (
        <div className="date-filter">
            <CButtonGroup>
                {Object.values(PeriodEnum).map((filter) => (
                    /* @ts-ignore */
                    <CButton
                        key={filter}
                        color="primary"
                        variant="outline"
                        active={selectedDateFilter === filter}
                        onClick={() => changeDateFilter(filter)}
                    >
                        {filter}
                    </CButton>
                ))}
            </CButtonGroup>

            <CInputGroup>
                {/* @ts-ignore */}
                <CButton onClick={handlePreviousMonth}>{"<"}</CButton>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    showMonthYearPicker
                    className="form-control"
                />
                {/* @ts-ignore */}
                <CButton onClick={handleNextMonth}>{">"}</CButton>
            </CInputGroup>
        </div>
    );
};

export default DateFilter;
