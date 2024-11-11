import {colorBars, setBarVals } from '../algorithmUtils';

export const MergeSort = async (values, sendNextStep, opStateRef, checkOpStateRef) => {
    
    const merge = async(arr, l, m, r) => {
        const n1 = m - l + 1;
        const n2 = r - m;
    
        // Create temp arrays
        const L = new Array(n1);
        const R = new Array(n2);
    
        // Copy data to temp arrays L[] and R[]
        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        let i = 0, j = 0;
        let k = l;
    
        // Merge the temp arrays back into arr[left..right]
        while (i < n1 && j < n2) {
            const abort = await checkOpStateRef(opStateRef);
            if (abort) return true;

            await colorBars({ [k+l] : 1 }, sendNextStep, true, arr.length)

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                await colorBars({ [k] : 2 }, sendNextStep)

                await setBarVals({ [k]: L[i] }, sendNextStep)
                i++;
            } else {
                arr[k] = R[j];
                await colorBars({ [k] : 2 }, sendNextStep)

                await setBarVals({ [k]: R[j] }, sendNextStep)
                j++;
            }
            k++;
        }
    
        // Copy the remaining elements of L[], if there are any
        while (i < n1) {
            arr[k] = L[i];
            await setBarVals( { [k]: L[i]}, sendNextStep)
            i++;
            k++;
        }
    
        // Copy the remaining elements of R[], if there are any
        while (j < n2) {
            arr[k] = R[j];
            await setBarVals( { [k]: R[j]}, sendNextStep)
            j++;
            k++;
        } 
    }

    const mergeSortHelper = async (arr, l, r) => {
        const abort = await checkOpStateRef(opStateRef);
        if (abort) return true;

        if (l < r){
            const m = Math.floor((l + r) / 2);

            await mergeSortHelper(arr, l, m)
            await mergeSortHelper(arr, m + 1, r)
            await merge(arr, l, m, r)
        }
    }

    await mergeSortHelper([...values], 0, values.length-1);
    return false;
}