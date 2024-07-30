import React from 'react';
import {CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CInputGroup,} from '@coreui/react';
import DatePicker from 'react-datepicker';
import {addMonths, subMonths} from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import useDateFilter from '../hooks/useDateFilter';
import PeriodEnum from "../../../constants/periodEnum";
import './DateFilter.scss'

const DateFilter = () => {
    const {selectedPeriod, selectedDate, changeSelectedPeriod, changeSelectedDate} = useDateFilter();

    const handleDateChange = (date: any) => {
        changeSelectedDate(date);
    };

    const handlePreviousMonth = () => {
        const newDate = subMonths(selectedDate, 1);
        changeSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = addMonths(selectedDate, 1);
        changeSelectedDate(newDate);
    };

    return (
        <div className="date-filter">
            <CDropdown>
                <CDropdownToggle color="secondary" variant="outline">
                    {selectedPeriod}
                </CDropdownToggle>
                <CDropdownMenu>
                    {Object.values(PeriodEnum).map((filter) => (
                        <CDropdownItem
                            key={filter}
                            active={selectedPeriod === filter}
                            onClick={() => changeSelectedPeriod(filter)}
                        >
                            {filter}
                        </CDropdownItem>
                    ))}
                </CDropdownMenu>
            </CDropdown>

            <CInputGroup className="date-picker-group">
                <CButton onClick={handlePreviousMonth} className="btn btn-outline-secondary">{"<"}</CButton>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    showMonthYearPicker
                    className="form-control btn btn-outline-secondary"
                />
                <CButton onClick={handleNextMonth} className="btn btn-outline-secondary">{">"}</CButton>
            </CInputGroup>
        </div>
    );
};

export default DateFilter;
