import React, {useState} from 'react';
import {CButton, CButtonGroup, CCard, CCardBody, CCollapse} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilChevronBottom, cilChevronRight, cilGrid, cilList} from '@coreui/icons';
import {SvgIconComponent} from '@mui/icons-material';
import './BookingList.scss';
import {Booking, CategoryBooking} from '../../../types';
import {mapIcon} from '../../../utils/mapIcon';
import {formatCurrency} from "../../../utils/formatCurrency";

interface BookingsListProps {
    data: CategoryBooking[];
}

const BookingList: React.FC<BookingsListProps> = ({data}) => {
    const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});
    const [viewMode, setViewMode] = useState<'list' | 'grouped'>('grouped');

    if (data.length <= 0) {
        return (
            <CCard className="mb-3">
                <CCardBody className="card-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6>No Transactions</h6>
                    </div>
                </CCardBody>
            </CCard>
        )
    }

    const toggleCategory = (categoryId: number) => {
        setOpenCategories((prevOpenCategories) => ({
            ...prevOpenCategories,
            [categoryId]: !prevOpenCategories[categoryId],
        }));
    };

    const renderBookings = (bookings: Booking[]) =>
        bookings.map((booking) => (
            <li key={booking.id} className="list-group-item booking-item">
                <div>{booking.bookingDate}</div>
                <div>{booking.description}</div>
                <div>{formatCurrency(booking.amount)}</div>
            </li>
        ));

    const renderCategory = (categoryBooking: CategoryBooking) => {
        const IconComponent: SvgIconComponent = mapIcon(categoryBooking.category.iconName);
        return (
            <div key={categoryBooking.category.id}>
                <CButton
                    className="d-flex align-items-center justify-content-between category-button"
                    onClick={() => toggleCategory(categoryBooking.category.id)}
                >
                    <div className="d-flex align-items-center">
                        <CIcon icon={openCategories[categoryBooking.category.id] ? cilChevronBottom : cilChevronRight}/>
                        <IconComponent style={{color: categoryBooking.category.colorCode}} className="category-icon"/>
                        <span className="category-text">{categoryBooking.category.name}</span>
                    </div>
                    <span className="category-total">{formatCurrency(categoryBooking.amount)}</span>
                </CButton>
                <CCollapse visible={openCategories[categoryBooking.category.id]}>
                    <ul className="list-group list-group-flush collapse-category">
                        {categoryBooking.children.length > 0 && categoryBooking.children.map((childCategory) => renderCategory(childCategory))}
                        {renderBookings(categoryBooking.bookings)}
                    </ul>
                </CCollapse>
            </div>
        );
    };


    const renderGroupedView = () => data.map((categoryBooking) => renderCategory(categoryBooking));

    const getAllBookings = (categoryBookings: CategoryBooking[]): Booking[] => {
        return categoryBookings.flatMap(categoryBooking => [
            ...categoryBooking.bookings,
            ...getAllBookings(categoryBooking.children),
        ]);
    };

    const renderListView = () => {
        const allBookings = getAllBookings(data);
        return (
            <ul className="list-group list-group-flush">
                {renderBookings(allBookings)}
            </ul>
        );
    };

    const renderToggle = () => {
        return (<CButtonGroup>
            <CButton size="sm" color={viewMode === 'list' ? 'primary' : 'secondary'} onClick={() => setViewMode('list')}>
                <CIcon icon={cilList}/>
            </CButton>
            <CButton size="sm" color={viewMode === 'grouped' ? 'primary' : 'secondary'} onClick={() => setViewMode('grouped')}>
                <CIcon icon={cilGrid}/>
            </CButton>
        </CButtonGroup>)
    }

    return (
        <CCard className="mb-3">
            <CCardBody className="card-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Transactions</h5>
                    {renderToggle()}
                </div>
                {viewMode === 'grouped' ? renderGroupedView() : <ul className="list-group list-group-flush">{renderListView()}</ul>}
            </CCardBody>
        </CCard>
    );
};

export default BookingList;
