import AccountDropdown from "./components/AccountDropdown";
import DateFilter from "./components/DateFilter";
import './ReportGraph.css';
import CreateButton from "./components/CreateButton";
import BudgetOverview from "./components/BudgetOverview";
import CategoryGraph from "./components/CategoryGraph";
import CategoryBookings from "./components/CategoryBookings";
import CategoryTypeFilter from "./components/CategoryTypeFilter";

const ReportGraph = () => {

    return (
        <div className="report-graph-container container">
            <div className="report-graph-header">
                <AccountDropdown/>
                <DateFilter/>
                <CategoryTypeFilter/>
                <CreateButton className="create-button"/>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <BudgetOverview/>
                    <CategoryGraph/>
                </div>
                <div className="col-md-8">
                    <CategoryBookings/>
                </div>
            </div>
        </div>
    )
}

export default ReportGraph;