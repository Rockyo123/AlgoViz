import { checkOpStateRef } from "../hooks";
import { colorBars } from "./algorithmUtils";
import { MergeSort, SelectionSort, BubbleSort, InsertionSort, QuickSort } from './algorithms';

export const asyncSort = async(values, algorithm, sendNextStep, opStateRef) => {
    let sortingAlgo = SelectionSort;

    switch(algorithm.toLowerCase()){
        case 'selection sort':
            sortingAlgo = SelectionSort;
            break;
        case 'merge sort':
            sortingAlgo = MergeSort;
            break;
        case 'bubble sort':
            sortingAlgo = BubbleSort;
            break;
        case 'insertion sort':
            sortingAlgo = InsertionSort;
            break;
        case 'quick sort': 
            sortingAlgo = QuickSort;
            break;
        default:
            sortingAlgo = SelectionSort;
            break;
    }

    const aborted = await sortingAlgo(values, sendNextStep, opStateRef, checkOpStateRef);
    await colorBars({}, sendNextStep, true, values.length)
    if (!aborted) await sendNextStep(['finished', [-1]]);
}



