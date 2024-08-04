export interface Booking {
    id: number;
    bookingDate: string;
    amount: number;
    description?: string;
    categoryId: number;
    categoryName: string;
    accountId: number;
    accountName: string;
}