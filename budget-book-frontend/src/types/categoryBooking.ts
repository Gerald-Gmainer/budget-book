import {Category} from "./category";
import {Booking} from "./booking";

export type CategoryBooking = {
    category: Category;
    bookings: Booking[];
    children: CategoryBooking[];
}