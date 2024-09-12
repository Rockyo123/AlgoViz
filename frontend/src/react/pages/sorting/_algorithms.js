export const SelectionSort = (values) => {
    let toSort = [...values];
    let stepStack = [];
    const colorArray = Array(toSort.length).fill(0);
    for (let i = 0; i < toSort.length; i++){
        //HIGHLIGHT currently selected pos
        colorArray[i] = 1
        stepStack.push(['color', [...colorArray]]);

        let min = toSort[i];
        let minIndex = i;
        //loop through arr and check for min
        for (let j = i+1; j < toSort.length; j++){
            //HIGHLIGHT pos being checked
            colorArray[j] = 1
            stepStack.push(['color', [...colorArray]]);

            //HIGHLIGHT pos if less than min
            if (toSort[j] < min){
                //HIGHLIGHT remove highlight from last minIndex
                colorArray[minIndex] = 0
                min = toSort[j]
                minIndex = j
                colorArray[i] = 2;
                colorArray[j] = 2;
                stepStack.push(['color', [...colorArray]]);
            }
            //HIGHLIGHT remove color from last checked pos
            if (minIndex !== j){
                colorArray[j] = 0;
            }
        }

        //HIGHLIGHT and SWAP if min found
        if (min !== toSort[i]){
            let tmp = toSort[i]
            toSort[i] = min;
            toSort[minIndex] = tmp
            colorArray[i] = 3;
            colorArray[minIndex] = 3;
            stepStack.push(['swap', [i, minIndex]]);
            stepStack.push(['color', [...colorArray]]);
        }
        else{
            //HIGHLIGHT remove colors from checked pos
            colorArray[i] = 0;
            colorArray[minIndex] = 0;
        }
    }
    stepStack.push(['color', [...colorArray]])
    return stepStack
}