import React, { useState, useEffect } from "react";
import { Sleep } from "../../../utils/_utils";
import { pathFind } from "../_algorithms";
import { useLatestRef } from "../../../hooks/useLatestRef";
import { getDelay } from "../../../utils/_utils";
import { getNextStepFromInstrType, updateSquaresWithVal } from "../components/Graph/_utils";
import { deepCopyGraphVals } from "../utils/GraphUtils";
import { useAsyncOperationController } from "../../../hooks/useAsyncOperationController";

const useSolveGraph = (graph, graphState, setGraphState, speed, algorithm) => {
    const [graphVals, setGraphVals] = useState(graph);
    const graphValsRef =  useLatestRef(graphVals);
    const speedRef = useLatestRef(speed);

    const startOperation = async (opStateRef) => {
        const newGraphVals = deepCopyGraphVals(graph);
        setGraphVals(graph)
        await pathFind(newGraphVals, algorithm, executeNextStep, opStateRef);
    }

    const { opStateRef, runOp, pauseOp, abortOp } = useAsyncOperationController(startOperation);
    
    useEffect(() => {
        if (graphState === 'Running') { 
            runOp();
        }    
        else {
            pauseOp();
        }
    }, [graphState])

    useEffect(() => {
        abortOp();
        setGraphVals(graph);
    }, [graph, algorithm]);


    //---executes steps ---//
    const executeNextStep = async (nextStep) => {
        let [newGraph, finished] = decodeInstr(deepCopyGraphVals(graphValsRef.current), nextStep)
        updateGraph(newGraph);
        if (finished){
            setGraphState('Finished');
            return;
        }
        const speedDelay = getDelay(500, speedRef.current, graphValsRef.current[0].length);
        await Sleep(speedDelay);
    }


    const decodeInstr = (curVals, instr) => {
        let newGraph =  curVals;
        let [newSquareVal, finished] = getNextStepFromInstrType(instr[0]);
        updateSquaresWithVal(newGraph, instr[1], newSquareVal);
        return [newGraph, finished];
    }        

    //helper function to update bar vals
    const updateGraph = (newGraph) => {
        setGraphVals(newGraph);
    }
    return graphVals
}

export default useSolveGraph;