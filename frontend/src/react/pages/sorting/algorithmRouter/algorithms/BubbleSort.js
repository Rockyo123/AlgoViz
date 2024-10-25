import {colorBars, swapIdx } from '../algorithmUtils';

export const BubbleSort = async(values, sendNextStep, opStateRef, checkOpStateRef) => {
    const toSort = [...values];
    for (let i = 0; i < toSort.length; i++){
        const abort = await checkOpStateRef(opStateRef);
        if (abort) return true;

        let swapped = false;
        for (let j = 0; j < toSort.length - i - 1; j++){
            await colorBars({[j]: 1, [j+1]: 1}, sendNextStep, true, toSort.length);
            const abort = await checkOpStateRef(opStateRef);
            if (abort) return true;

            if (toSort[j] > toSort[j+1]){
                await colorBars({[j]: 2, [j+1]: 2}, sendNextStep)
                await swapIdx(toSort, j, j+1, sendNextStep);
                swapped = true;
                await colorBars({[j]: 0, [j+1]: 1}, sendNextStep)
            }
            else{
                await colorBars({[j]: 1, [j+1]: 0}, sendNextStep)
            }
        }
        if (!swapped) break;
    }
    return false;
}