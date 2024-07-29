import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AccountDropdown from "./components/AccountDropdown";
import DateFilter from "./components/DateFilter";
import CreateButton from "./components/CreateButton";
import BudgetOverview from "./components/BudgetOverview";
import CategoryGraph from "./components/CategoryGraph";
import BookingList from "./components/BookingList";
import CategoryTypeFilter from "./components/CategoryTypeFilter";
import {fetchBudgetSummary} from './slices/budgetSummarySlice';
import {fetchCategoryBookings} from "./slices/bookingsSlice";
import './Transactions.scss';
import {AppDispatch, RootState} from "../../app/store";
import ListView from "./components/ListView";

const Transactions = () => {
    const dispatch: AppDispatch = useDispatch();
    const {period, date} = useSelector((state: RootState) => state.dateFilter);
    const {selectedCategoryTypeFilter} = useSelector((state: RootState) => state.categoryTypeFilter);

    const {data: summaryData, status: summaryStatus, error: summaryError} = useSelector((state: RootState) => state.budgetSummary);
    const {data: bookingsData, status: bookingsStatus, error: bookingsError} = useSelector((state: RootState) => state.bookings);

    const [groupByCategory, setGroupByCategory] = useState(false); // State for the ListView toggle

    useEffect(() => {
        dispatch(fetchBudgetSummary({date}));
        dispatch(fetchCategoryBookings({date}));
    }, [period]);

    if (summaryStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (summaryStatus === 'failed') {
        return <div>Error: {summaryError}</div>;
    }

    const filteredOverviews = summaryData?.overviews.filter(overview =>
        overview.category.type === selectedCategoryTypeFilter
    ) || [];

    const filteredBookings = bookingsData?.filter(overview =>
        overview.category.type === selectedCategoryTypeFilter
    ) || [];

    return (
        <div className="transactions-container container">
            <div className="transactions-header">
                <AccountDropdown/>
                <CategoryTypeFilter/>
                <ListView groupByCategory={groupByCategory} setGroupByCategory={setGroupByCategory}/>
                <CreateButton className="create-button"/>
            </div>

            <div className="transactions-header">
                <DateFilter/>
            </div>

            <div className="row">
                <div className="col-md-5">
                    {summaryData && <BudgetOverview data={summaryData}/>}
                    <CategoryGraph data={filteredOverviews}/>
                </div>
                <div className="col-md-7">
                    <BookingList data={filteredBookings}/>
                </div>
            </div>
        </div>
    )
}

export default Transactions;
