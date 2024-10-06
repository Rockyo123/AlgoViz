import React, { useEffect, useState } from "react"

/**
 * Custom hook that handles an array, ensuring it stays within the bounds of both max vals and max entries.
 * This hook manages the length of the array, clamps its values based on `maxArrVal`, and allows for 
 * randomizing the array values.
 * Probably a bit more complex than it needs to be but personal project so why not have fun ya know?
 *
 * @param {number} maxArrVal - The maximum value allowed for the array entries.
 * @param {number} maxArrEntries - The maximum number of entries allowed in the array.
 *
 * @returns {[Array<number>, Function, Function, Function]} 
 *          Returns an array of the current values, 
 *          Function to update the array values, 
 *          Function to randomize array values,
 *          Function to update the array length.
 */
export const useResponsiveArray = (maxArrVal, maxArrEntries) => {
    const [array, setArray] = useState([]);


    // Adjust array values based on the maxArrVal
    useEffect(() => {
        if (!maxArrVal) return;
        const newArray =  [...array].map(val => Math.min(val, maxArrVal));
        setArray(newArray);
    }, [maxArrVal]);

    // Adjust the array length based on the maxArrEntries
    useEffect(() => {
        if (!maxArrEntries) return;
        if (maxArrEntries < array.length){
            updateArrayLength(maxArrEntries)
        }
    }, [maxArrEntries]);

    // Initialize the array if empty, with random values
    useEffect(() => {
        if (!maxArrVal) return;
        if (array.length) return;
        setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * maxArrVal) + 1));
    }, [maxArrVal])
    
    //  Updates the values of the array, ensuring each value does not exceed `maxArrVal`.
    const updateArrayVals = (arrayIn) => {
        const newArray = [];
        for (let i = 0; i < arrayIn.length; i++){
            newArray.push(Math.min(arrayIn[i], maxArrVal));
        }
        setArray(newArray);
    }
    //  Randomizes the values of the current array, keeping the length the same.
    const randomizeArrayVals = () => {
        let newArr = [];
        for (let i = 0; i < array.length; i++){
            newArr.push(Math.floor(Math.random() * maxArrVal) + 1);
        }
        setArray(newArr);
    }

    //  Updates the length of the array, either truncating or extending it with random values.
    const updateArrayLength = (ArrayLengthIn) => {

        let curVals = [...array];
        const lenDif = ArrayLengthIn - curVals.length;

        if (lenDif < 0){
            curVals = curVals.slice(0, ArrayLengthIn-1);
        }
        else if (lenDif > 0){
            for (let i = 0; i < lenDif; i++){
                curVals.push(Math.floor(Math.random() * maxArrVal) + 1)
            }
        }
        setArray(curVals);
    }

    return [array, updateArrayVals, randomizeArrayVals, updateArrayLength];
}