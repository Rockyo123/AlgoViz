export const SelectionSort = async (values, sendNextStep, abortRef) => {
    let toSort = [...values];
    const colorArray = Array(toSort.length).fill(0);
    const runStep = async (i) => {
        if (abortRef.current) return;

        // HIGHLIGHT currently selected pos
        colorArray[i] = 1;
        await sendNextStep(['color', [...colorArray]]);

        let min = toSort[i];
        let minIndex = i;

        // Loop through array to find the min
        for (let j = i + 1; j < toSort.length; j++) {
            if (abortRef.current) return;

            // HIGHLIGHT position being checked
            colorArray[j] = 1;
            await sendNextStep(['color', [...colorArray]]);

            // Update minimum if found
            if (toSort[j] < min) {
                // Remove highlight from last minIndex
                colorArray[minIndex] = 0;
                min = toSort[j];
                minIndex = j;
                colorArray[i] = 2;
                colorArray[j] = 2;
                await sendNextStep(['color', [...colorArray]]);
            }

            // Remove color from the last checked position
            if (minIndex !== j) {
                colorArray[j] = 0;
            }

            // Introduce a delay between each step to keep UI responsive
            await new Promise((resolve) => setTimeout(resolve, 1)); // 50ms delay between iterations
        }

        // HIGHLIGHT and swap if min found
        if (min !== toSort[i]) {
            let tmp = toSort[i];
            toSort[i] = min;
            toSort[minIndex] = tmp;
            colorArray[i] = 3;
            colorArray[minIndex] = 3;
            await sendNextStep(['swap', [i, minIndex]]);
            await sendNextStep(['color', [...colorArray]]);
        } else {
            colorArray[i] = 0;
            colorArray[minIndex] = 0;
        }

        await sendNextStep(['color', [...colorArray]]);
        if (i + 1 < toSort.length) {
            runStep(i + 1);
        }
        else{
            sendNextStep(['finished', []]);
        }
    };
    runStep(0);
};