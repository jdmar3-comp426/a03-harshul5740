import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg:
    {
        city: undefined,
        highway: undefined,
    },
    allYearStats: undefined,
    ratioHybrids: undefined,
};

let r = 0;
let cityMPG = 0;
let high = 0;
let arr = []

for (const i in mpg_data) {
    if (mpg_data[i]["hybrid"] == true) {
        r++;
    }
    cityMPG += mpg_data[i]["city_mpg"];
    high += mpg_data[i]["highway_mpg"];
    arr.push(mpg_data[i]["year"]);
}
allCarStats.avgMpg["city"] = cityMPG / mpg_data.length;
allCarStats.avgMpg["highway"] = high / mpg_data.length;
allCarStats.ratioHybrids = r / mpg_data.length;
allCarStats.allYearStats = getStatistics(arr);


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {

    makerHybrids: undefined,
    avgMpgByYearAndHybrid: undefined
};

let minYear = allCarStats.allYearStats.min;
let maxYear = allCarStats.allYearStats.max;
let lis = {};
for (let i = minYear; i <= maxYear; i++) {
    let hybridCity = 0;
    let hybridHighway = 0;
    let petrolCity = 0;
    let petrolHighway = 0;
    let count1 = 0;
    let count2 = 0;

    for (const index in mpg_data) {
        if (mpg_data[index]["year"] == i) {
            if (mpg_data[index]["hybrid"] == true) {
                hybridCity += mpg_data[index]["city_mpg"];
                hybridHighway += mpg_data[index]["highway_mpg"];
                count1 += 1;
            } else {
                petrolCity += mpg_data[index]["city_mpg"];
                petrolHighway += mpg_data[index]["highway_mpg"];
                count2 += 1;
            }
        }
    }
    hybridCity = hybridCity / count1;
    hybridHighway = hybridHighway / count1;
    petrolCity = petrolCity / count2;
    petrolHighway = petrolHighway / count2;
    lis[i] = {"hybrid": {"city": hybridCity, "highway": hybridHighway}, "notHybrid": {"city": petrolCity, "highway": petrolHighway}}
    hybridCity = 0;
    hybridHighway = 0;
    petrolCity = 0;
    petrolHighway = 0;
    count1 = 0;
    count2 = 0;
}
moreStats.avgMpgByYearAndHybrid = lis;


