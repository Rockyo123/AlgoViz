const getBlankColorDict = (arrLen) => {
    let colorDict = {};
    for (let i = 0; i < arrLen; i++) {
        colorDict[i] = 0;
    }
    return colorDict;
};

export const colorBars = async (colorDict, sendNextStep, resetBars=false, arrLen=0) => {
    let base = {}
    if (resetBars){
        base = getBlankColorDict(arrLen)
    }
    const colorDictToSend = {
        ...base,
        ...colorDict,
    }
    await sendNextStep(['color', colorDictToSend]);
}

export const setBarVals = async(barValDict, sendNextStep) => {
    await sendNextStep(['set', barValDict])
}

export const swapIdx = async(arr, i, j, sendNextStep) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    const newBarValDict = {
        [i]: arr[i],
        [j]: arr[j]
    }
    await setBarVals(newBarValDict, sendNextStep);
}

