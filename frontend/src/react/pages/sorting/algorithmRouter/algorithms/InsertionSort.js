import {colorBars, swapIdx } from '../algorithmUtils';

export const InsertionSort = async (values, sendNextStep, opStateRef, checkOpStateRef) => {
    let toSort = [...values];
    for (let i = 1; i < toSort.length; i++){

        const abort = await checkOpStateRef(opStateRef);
        if (abort) return;
        
        let j = i;
        await colorBars({[j]: 1, [i]: 1}, sendNextStep, true, toSort.length)
        while (j > 0 && toSort[j] < toSort[j-1]) {
            const abort = await checkOpStateRef(opStateRef);
            if (abort) return;
            await colorBars({[j]: 2, [j-1]: 2, [j+1]: 0}, sendNextStep)
            await swapIdx(toSort, j, j-1, sendNextStep);
            j--;
        }
    }
}