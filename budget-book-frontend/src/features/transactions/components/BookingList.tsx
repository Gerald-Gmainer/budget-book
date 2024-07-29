import React, {useState} from 'react';
import {CButton, CCard, CCardBody, CCollapse} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilChevronBottom, cilChevronRight} from '@coreui/icons';
import {SvgIconComponent} from '@mui/icons-material';
import './BookingList.scss';
import {Booking, CategoryBooking} from "../../../types";
import {mapIcon} from "../../../utils/mapIcon";

interface BookingsListProps {
    data: CategoryBooking[];
}

const BookingList: React.FC<BookingsListProps> = ({data}) => {
    const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});

    const toggleCategory = (categoryId: number) => {
        setOpenCategories((prevOpenCategories) => ({
            ...prevOpenCategories,
            [categoryId]: !prevOpenCategories[categoryId],
        }));
    };

    const renderBookings = (bookings: Booking[]) => (
        bookings.map((booking) => (
            <li key={booking.id} className="list-group-item booking-item">
                <div>{booking.bookingDate}</div>
                <div>{booking.description}</div>
                <div>${booking.amount}</div>
            </li>
        ))
    );

    const renderCategory = (categoryBooking: CategoryBooking) => {
        const IconComponent: SvgIconComponent = mapIcon(categoryBooking.category.iconName);
        return (
            <div key={categoryBooking.category.id}>
                {/* @ts-ignore */}
                <CButton
                    color="link"
                    className="d-flex align-items-center category-button"
                    onClick={() => toggleCategory(categoryBooking.category.id)}
                >
                    <CIcon icon={openCategories[categoryBooking.category.id] ? cilChevronBottom : cilChevronRight}/>
                    <IconComponent style={{color: categoryBooking.category.colorCode}} className="category-icon"/>
                    <span className="ml-2 category-text">{categoryBooking.category.name}</span>
                </CButton>
                <CCollapse visible={openCategories[categoryBooking.category.id]}>
                    <ul className="list-group list-group-flush" style={{marginLeft: "16px"}}>
                        {categoryBooking.children.length > 0 && categoryBooking.children.map((childCategory) => renderCategory(childCategory))}
                        {renderBookings(categoryBooking.bookings)}
                    </ul>
                </CCollapse>
            </div>
        );
    };

    return (
        <CCard className="mb-3">
            <CCardBody>
                {data.map((categoryBooking) => renderCategory(categoryBooking))}
            </CCardBody>
        </CCard>
    );
};

export default BookingList;
