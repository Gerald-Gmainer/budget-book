/**
 * Formats a given amount as a currency string with the Euro symbol.
 *
 * @param {number} amount - The amount to format.
 * @param {number} [decimals=2] - The number of decimal places. Defaults to 2.
 * @returns {string} The formatted currency string.
 */
const formatCurrency = (amount: number, decimals: number = 2): string => {
    if (amount === null || amount === undefined) {
        return "undefined"
    }
    return amount.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};

export {formatCurrency}