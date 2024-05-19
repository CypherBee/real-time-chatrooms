/**
 * Pads a number with a leading zero if it is less than ten.
 * @param {number} num - The number to pad.
 * @returns {string} The padded string.
 */
const padZero = (num) => num.toString().padStart(2, '0');

/**
 * Extracts the time in HH:mm format from a date string.
 * @param {string} dateString - The input date string.
 * @returns {string} The formatted time string.
 */
export function getTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

export default getTime;