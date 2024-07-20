import AccountDropdown from "./components/AccountDropdown";
import DateFilter from "./components/DateFilter";
import CreateButton from "./components/CreateButton";
import BudgetOverview from "./components/BudgetOverview";
import CategoryGraph from "./components/CategoryGraph";
import CategoryBookings from "./components/CategoryBookings";
import CategoryTypeFilter from "./components/CategoryTypeFilter";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchBudgetSummaryData} from './slices/budgetSummarySlice';
import './Transactions.scss';
import {AppDispatch, RootState} from "../../app/store";

const Transactions = () => {
    const dispatch: AppDispatch = useDispatch();
    const {data: summaryData, status: summaryStatus, error: summaryError} = useSelector((state: RootState) => state.budgetSummary);
    const {selectedDateFilter, from, to} = useSelector((state: RootState) => state.dateFilter);
    const {selectedCategoryTypeFilter} = useSelector((state: RootState) => state.categoryTypeFilter);

    useEffect(() => {
        dispatch(fetchBudgetSummaryData({from, to}));
    }, [selectedDateFilter]);

    if (summaryStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (summaryStatus === 'failed') {
        return <div>Error: {summaryError}</div>;
    }

    const filteredOverviews = summaryData?.overviews.filter(overview =>
        overview.category.type === selectedCategoryTypeFilter
    ) || [];

    return (
        <div className="report-graph-container container">
            <div className="report-graph-header">
                <AccountDropdown/>
                <DateFilter/>
                <CategoryTypeFilter/>
                <CreateButton className="create-button"/>
            </div>

            <div className="row">
                <div className="col-md-5">
                    {summaryData && <BudgetOverview data={summaryData}/>}
                    <CategoryGraph data={{overviews: filteredOverviews}}/>
                </div>
                <div className="col-md-7">
                    <CategoryBookings/>
                </div>
            </div>
        </div>
    )
}

export default Transactions;