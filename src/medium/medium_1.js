import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array = array.sort((a,b) => a-b);
    let half = Math.floor(array.length / 2);

    if (array.length % 2 == 1) {
        return array[half];
    } else {
        return (array[half - 1] + array[half]) / 2.0;
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let length = array.length;
    let sum = getSum(array);
    let mean = sum / length;
    array = array.sort((a,b) => a-b);
    let min = array[0];
    let max = array[length - 1];
    let median = getMedian(array);
    let variance1 = variance(array, mean);
    let standard_deviation = Math.sqrt(variance1);

    return {length, sum, mean, median, min, max, variance1, standard_deviation};
}

// let array = [3,2,5,6,2,7,4,2,7,5];
// console.log(getStatistics([3,2,4,5,5,5,2,6,7]));
// console.log(getMedian([14,8,5,7,7,5,2,7,5,3,47,9]));
// console.log(getStatistics([14,8,5,7,7,5,2,7,5,3,47,9]));

