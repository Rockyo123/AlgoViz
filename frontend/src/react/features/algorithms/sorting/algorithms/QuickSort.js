import {colorBars, swapIdx } from '../algorithmUtils';

export const QuickSort = async (values, sendNextStep, opStateRef, checkOpStateRef) => {

    const QuickSortHelper = async(arr, l, r) => {
        if (l < r) {
            let pivot = l;
            await colorBars({[pivot]: 1}, sendNextStep)
            let i = l;
            let j = r;
            await colorBars({[j]: 2}, sendNextStep)
            while (i < j) {

                const abort = await checkOpStateRef(opStateRef);
                if (abort) return true;
                
                while (arr[pivot] >= arr[i] && i < j) {
                    await colorBars({[i]: 0, [i+1]: 3}, sendNextStep);
                    i++;
                }
                while (arr[pivot] < arr[j]) {
                    await colorBars({[j]: 0, [j-1]: 2}, sendNextStep);
                    j--;
                }
                await colorBars({[pivot]: 1}, sendNextStep)
                if (i < j) {
                    await swapIdx(arr, i, j, sendNextStep);
                }
            }
            await swapIdx(arr, pivot, j, sendNextStep);
            await colorBars({}, sendNextStep, true, arr.length)

            await QuickSortHelper(arr, l, j - 1);
            await QuickSortHelper(arr, j + 1, r);
        }
    }
    await QuickSortHelper([...values], 0, values.length-1);
    return false;
}