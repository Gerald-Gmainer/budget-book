const BASE_URL = 'http://localhost:8080';

const API_URLS = {
    BASE_URL: BASE_URL,
    ACCOUNTS: `${BASE_URL}/accounts`,
    BUDGET_SUMMARY: `${BASE_URL}/category-bookings/summary/{from}/{to}`,
};

export default API_URLS;