import React, { useState, useEffect } from "react";
import { Sleep, getDelay } from "@/utils/_utils";
import { asyncTreeSearch } from "@/features/algorithms/trees";
import { useLatestRef } from "@/hooks/useLatestRef";
import { updateNodeWithColor, getNextStepFromInstrType } from "./utils";
import { deepCopyTree } from '../../treeUtils'
import { useAsyncOperationController } from "@/features/algorithms/hooks";

let curTreeVals = [[]];
//  creating a whole new tree, just in case in the future want to actually change the tree vals or structure or something.
const useSolveTree = (tree, treeChangedFlag, numNodes, target, treeState, setTreeState, speed, algorithm) => {
    
    const [treeVals, setTreeVals] = useState(tree);
    const [solvedTreeChangedFlag, setSolvedTreeChangedFlag] = useState(0);

    curTreeVals =  treeVals;
    const speedRef = useLatestRef(speed);

    const startOperation = async (opStateRef) => {
        const newTree = deepCopyTree(tree);
        setTreeVals(tree);
        setSolvedTreeChangedFlag(prevVal => prevVal + 1);
        await asyncTreeSearch(newTree, target, algorithm, executeNextStep, opStateRef);
    }

    const { opStateRef, runOp, pauseOp, abortOp } = useAsyncOperationController(startOperation);
    
    useEffect(() => {
        if (treeState === 'Running') { 
            runOp();
        }    
        else {
            pauseOp();
        }
    }, [treeState])

    useEffect(() => {
        abortOp();
        setTreeVals(tree);
        setSolvedTreeChangedFlag(prevVal => prevVal + 1);
    }, [treeChangedFlag, target, algorithm]);

    //---executes steps ---//
    const executeNextStep = async (nextStep) => {
        let [newTree, finished] = decodeInstr(deepCopyTree(curTreeVals), nextStep)
        updateTree(newTree);
        if (finished){
            setTreeState('Finished');
            return;
        }
        const speedDelay = getDelay(20000, speedRef.current, numNodes);
        await Sleep(speedDelay);
    }

    const decodeInstr = (curVals, instr) => {
        let newTree = curVals;
        let nodeId = instr[1];
        let [color, finished] = getNextStepFromInstrType(instr[0]);
        updateNodeWithColor(newTree, nodeId, color);
        return [newTree, finished];
    }        

    const updateTree = (newTree) => {
        setTreeVals(newTree);
        setSolvedTreeChangedFlag(prevVal => prevVal + 1);
    }

    return [treeVals, solvedTreeChangedFlag]
}

export default useSolveTree;