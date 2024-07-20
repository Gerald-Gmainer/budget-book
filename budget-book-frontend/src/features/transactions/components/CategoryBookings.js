import React, {useState} from 'react';
import {CButton, CCard, CCardBody, CCollapse} from '@coreui/react';
import {CIcon} from '@coreui/icons-react';
import {cilBasket, cilChevronBottom, cilChevronRight, cilFastfood, cilHome, cilRestaurant, cilSpreadsheet, cilStar} from '@coreui/icons';
import './CategoryBookings.scss';

const bookingsData = [
    {
        category: 'Food',
        bookings: [
            {date: '2024-07-01', comment: 'Groceries', amount: 150},
            {date: '2024-07-05', comment: 'Restaurant', amount: 50},
            {date: '2024-07-10', comment: 'Coffee', amount: 20},
        ],
    },
    {
        category: 'House',
        bookings: [
            {date: '2024-07-02', comment: 'Rent', amount: 1000},
        ],
    },
    {
        category: 'Eating Out',
        bookings: [
            {date: '2024-07-03', comment: 'Dinner', amount: 100},
            {date: '2024-07-07', comment: 'Lunch', amount: 50},
            {date: '2024-07-12', comment: 'Brunch', amount: 30},
        ],
    },
    {
        category: 'Household',
        bookings: [
            {date: '2024-07-04', comment: 'Cleaning Supplies', amount: 50},
            {date: '2024-07-11', comment: 'Laundry', amount: 20},
        ],
    },
    {
        category: 'Cloth',
        bookings: [
            {date: '2024-07-06', comment: 'Shirt', amount: 50},
            {date: '2024-07-08', comment: 'Pants', amount: 100},
        ],
    },
    {
        category: 'Other',
        bookings: [
            {date: '2024-07-09', comment: 'Gift', amount: 100},
        ],
    },
];

const icons = [cilFastfood, cilHome, cilRestaurant, cilBasket, cilSpreadsheet, cilStar];
const colors = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const CategoryBookings = () => {
    const [openCategories, setOpenCategories] = useState({});

    const toggleCategory = (category) => {
        setOpenCategories((prevOpenCategories) => ({
            ...prevOpenCategories,
            [category]: !prevOpenCategories[category],
        }));
    };

    return (
        <CCard className="mb-3">
            <CCardBody>
                {bookingsData.map((categoryData, idx) => (
                    <div key={categoryData.category}>
                        <CButton
                            color="link"
                            className="d-flex align-items-center category-button"
                            onClick={() => toggleCategory(categoryData.category)}
                        >
                            <CIcon icon={openCategories[categoryData.category] ? cilChevronBottom : cilChevronRight}/>
                            <div style={{width: "10px"}}></div>
                            <CIcon icon={icons[idx]} style={{color: colors[idx], marginRight: '5px'}}/>
                            <span className="ml-2 category-text">{categoryData.category}</span>
                        </CButton>
                        <CCollapse visible={openCategories[categoryData.category]}>
                            <ul className="list-group list-group-flush">
                                {categoryData.bookings.map((booking, index) => (
                                    <li key={index} className="list-group-item booking-item" style={{paddingLeft: "30px"}}>
                                        <div>{booking.date}</div>
                                        <div>{booking.comment}</div>
                                        <div>${booking.amount}</div>
                                    </li>
                                ))}
                            </ul>
                        </CCollapse>
                    </div>
                ))}
            </CCardBody>
        </CCard>
    );
};

export default CategoryBookings;
