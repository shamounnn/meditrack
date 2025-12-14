/**
 * Simple Helper Functions
 * 
 * This file demonstrates reusable utility functions
 */

/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
    if (isNaN(amount)) {
        return '$0.00';
    }
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Format a date string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    if (!date) {
        return '';
    }

    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
        return '';
    }

    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Capitalize the first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalizeWords(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Truncate a string to a specified length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export function truncateString(str, maxLength = 50) {
    if (typeof str !== 'string') {
        return '';
    }
    
    if (str.length <= maxLength) {
        return str;
    }
    
    return str.substring(0, maxLength) + '...';
}

/**
 * Debounce a function call
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Generate a random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID string
 */
export function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

/**
 * Check if a value is empty
 * @param {*} value - Value to check
 * @returns {boolean} True if empty
 */
export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }
    
    if (typeof value === 'string') {
        return value.trim().length === 0;
    }
    
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    
    return false;
}
