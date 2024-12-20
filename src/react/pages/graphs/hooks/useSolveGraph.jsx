import React, { useState, useEffect } from "react";
import { Sleep } from "../../../utils/_utils";
import { asyncPathFind } from "../../../features/algorithms/pathfinding";
import { useLatestRef } from "../../../hooks/useLatestRef";
import { getDelay } from "../../../utils/_utils";
import { getNextStepFromInstrType, updateSquaresWithVal } from "../components/Graph/_utils";
import { deepCopyGraphVals } from "../utils/GraphUtils";
import { useAsyncOperationController } from "../../../features/algorithms/hooks";

let curGraphVals = [[]];

/**
 * A custom hook for managing and solving graph-based pathfinding visualizations with a given algorithm and speed setting.
 * This hook handles asynchronous pathfinding, updating the graph state, and managing operation controls.
 * 
 * @param {Array<Array<number>>} graph - Initial 2D array representing the graph's nodes and connections.
 * @param {string} graphState - Current state of the graph, e.g., 'Running', 'Paused', or 'Finished'.
 * @param {Function} setGraphState - Function to set the graph's state.
 * @param {number} speed - Speed at which steps are executed (influences delay between steps).
 * @param {string} algorithm - The algorithm to use for pathfinding (e.g., 'BFS', 'DFS', 'A*').
 * 
 * @returns {Array<Array<number>>} - The current state of the graph (updated as the algorithm executes).
 */
const useSolveGraph = (graph, graphState, setGraphState, speed, algorithm) => {
    const [graphVals, setGraphVals] = useState(graph);
    curGraphVals =  graphVals;
    const speedRef = useLatestRef(speed);

    const startOperation = async (opStateRef) => {
        const newGraphVals = deepCopyGraphVals(graph);
        setGraphVals(graph)
        await asyncPathFind(newGraphVals, algorithm, executeNextStep, opStateRef);
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
        let [newGraph, finished] = decodeInstr(deepCopyGraphVals(curGraphVals), nextStep)
        updateGraph(newGraph);
        if (finished){
            setGraphState('Finished');
            return;
        }
        const speedDelay = getDelay(500, speedRef.current, curGraphVals[0].length);
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