import React, { useEffect, useState } from "react";
import { Sleep, getDelay } from "@/utils/_utils";
import { asyncLinkedListSearch } from "@/features/algorithms/linkedLists";
import { createLinkedListArr, deepCopyLinkedList } from '../../linkedListUtils'
import { updateNodeWithColor, getNextStepFromInstrType } from "./utils";
import { useLatestRef } from "@/hooks/useLatestRef";
import { useAsyncOperationController } from "@/features/algorithms/hooks";

let curLinkedListVals = [];

const useSolveLinkedList = ( linkedList, linkedListChangedFlag, listState, setListState, target, speed, algorithm ) => {
    const [linkedListVals, setLinkedListVals] = useState(deepCopyLinkedList(linkedList));
    const [linkedListArr, setLinkedListArr] = useState(createLinkedListArr(linkedList))
    
    curLinkedListVals = linkedListVals
    const speedRef = useLatestRef(speed);
    
    const updateListVals = (listIn) => {
        setLinkedListVals(listIn);
        setLinkedListArr(createLinkedListArr(listIn));
    }

    const startOperation = async (opStateRef) => {
        const newList = deepCopyLinkedList(linkedList);
        updateListVals(linkedList);
        await asyncLinkedListSearch(newList, target, algorithm, executeNextStep, opStateRef);
    }

    const { opStateRef, runOp, pauseOp, abortOp } = useAsyncOperationController(startOperation);
    
    useEffect(() => {
        if (listState === 'Running') { 
            runOp();
        }    
        else {
            pauseOp();
        }
    }, [listState]);
    
    useEffect(() => {
        abortOp();
        updateListVals(linkedList);
    }, [linkedListChangedFlag, target, algorithm]);

    //---executes steps ---//
    const executeNextStep = async (nextStep) => {
        let [newList, finished] = decodeInstr(deepCopyLinkedList(curLinkedListVals), nextStep)
        updateListVals(newList);
        if (finished){
            setListState('Finished');
            return;
        }
        const speedDelay = getDelay(20000, speedRef.current, linkedListArr.length);
        await Sleep(speedDelay); 
    }

    const decodeInstr = (curVals, instr) => {
        let newList = curVals;
        let nodeIdx = instr[1];
        let [color, finished] = getNextStepFromInstrType(instr[0]);
        updateNodeWithColor(newList, nodeIdx, color);
        return [newList, finished];
    }        
    
    return linkedListArr;
}

export default useSolveLinkedList;