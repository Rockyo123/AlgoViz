import {colorBars, swapIdx } from '../algorithmUtils';

const getColorDict = (i, j, minIdx, prevMinIdx) => {
    let colorDict = {
        [prevMinIdx]: 0,
        [i-1]: 0,
        [i]: 1,
        [j]: 1
    }

    if (i !== minIdx){
        colorDict[i] = 2;
        colorDict[minIdx] = 2;
    }

    if (j-1 !== i && j-1 !== minIdx) {
        colorDict[j-1] = 0;
    }
    return colorDict
}


export const SelectionSort = async (values, sendNextStep, opStateRef, checkOpStateRef) => {
    let toSort = [...values];
    let minIdx = 0;
    let min = toSort[0]
    for (let i = 0; i < toSort.length; i++){
        await colorBars({[minIdx]: 0, [toSort.length-1]: 0, [Math.max(i-1, 0)]: 0}, sendNextStep)
        min = toSort[i];
        minIdx = i;
        
        //now search arr
        for (let j = i+1; j < toSort.length; j++){
            let prevMinIdx = minIdx;
            const abort = await checkOpStateRef(opStateRef);
            if (abort) return true;


            if (toSort[j] < min){
                min = toSort[j];
                minIdx = j;
            }

            //highlight state of current graph
            let colorDict = getColorDict(i, j, minIdx, prevMinIdx);
            await colorBars(colorDict, sendNextStep);

        }
        //swap min
        if (minIdx !== i) {
            await swapIdx(toSort, i, minIdx, sendNextStep)
        }        
    }
    return false;
};