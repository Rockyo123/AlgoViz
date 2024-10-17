import React, {useEffect, useState, useRef} from "react"
import GraphSquare from "./GraphSquare"
import { Sleep } from "../../../../utils/_utils"
import { pathFind } from "../../_algorithms"
import { useLatestRef } from "../../../../hooks/useLatestRef"
import { getDelay } from "../../../../utils/_utils"
import { getNextStepFromInstrType, updateSquaresWithVal } from "./_utils"
import { deepCopyGraphVals } from "../../utils/GraphUtils"
import { useAsyncOperationController } from "../../../../hooks/useAsyncOperationController"

const SolvableGraph = (props) => {
    const [graphVals, setGraphVals] = useState(props.arr);
    const graphValsRef =  useLatestRef(graphVals);
    const speedRef = useLatestRef(props.speed);

    const startOperation = async (opStateRef) => {
        const newGraphVals = deepCopyGraphVals(props.arr);
        setGraphVals(props.arr)
        await pathFind(newGraphVals, props.algorithm, executeNextStep, opStateRef);
    }

    const { opStateRef, runOp, pauseOp, abortOp } = useAsyncOperationController(startOperation);
    
    useEffect(() => {
        if (props.graphState === 'Running') { 
            runOp();
        }    
        else {
            pauseOp();
        }
    }, [props.graphState])

    useEffect(() => {
        abortOp();
        setGraphVals(props.arr);
    }, [props.algorithm]);


    //---executes steps ---//
    const executeNextStep = async (nextStep) => {
        let [newGraph, finished] = decodeInstr(deepCopyGraphVals(graphValsRef.current), nextStep)
        if (finished[0]){
            props.setGraphState('Finished');
            return;
        }
        updateGraph(newGraph);
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

    const graphSquares = graphVals.map((row, rowIndex) => (
        <div key={rowIndex} className="graph-grid-row">
            {row.map((val, colIndex) => (
            <GraphSquare 
                key={colIndex} 
                val={val}
            />
            ))}
    </div>
    ));


    return (
        <div className="graph-grid">
            {graphSquares}
        </div>
    )
    }

export default SolvableGraph;
