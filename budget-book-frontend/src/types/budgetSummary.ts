import {CategoryBookingOverview} from "./categoryBookingOverview";

export interface BudgetSummary {
    income: number;
    outcome: number;
    balance: number;
    overviews: CategoryBookingOverview[];
}