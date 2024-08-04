import {Category} from "./category";

export type CategoryBookingOverview = {
    category: Category,
    amount: number,
    percentage: number,
    children: CategoryBookingOverview[]
}