const BASE_URL = 'http://localhost:8080';

const API_URLS = {
    BASE_URL: BASE_URL,
    ACCOUNTS: `${BASE_URL}/accounts`,
    BUDGET_SUMMARY: `${BASE_URL}/category-bookings/summary/month/{date}`,
    CATEGORY_BOOKINGS: `${BASE_URL}/category-bookings/month/{date}`,
    BOOKINGS: `${BASE_URL}/bookings`,
    CATEGORIES: `${BASE_URL}/categories`,
};

export default API_URLS;