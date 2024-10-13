import React, {useEffect, useState, useRef} from "react"
import GraphSquare from "./GraphSquare"
import { Sleep } from "../../../../utils/_utils"
import { pathFind } from "../../_algorithms"
import { useLatestRef } from "../../../../hooks/useLatestRef"
import { getDelay } from "../../../../utils/_utils"
import { getNextStepFromInstrType, updateSquaresWithVal } from "./_utils"
const SolveGraph = (props) => {
    const [graphVals, setGraphVals] = useState(props.arr)
    const graphValsRef =  useLatestRef(graphVals);
    const speedRef = useRef(props.speed);
    const abortRef = useRef(false);
    
    useEffect(() => {
        if (props.start){
            abortRef.current = false;
            pathFind(graphVals, props.algorithm, executeNextStep, abortRef);
        }    
        else{
            abortRef.current = true;
        }
    }, [props.start]);

    //---executes steps ---//
    const executeNextStep = async (nextStep) => {
        let [newGraph, finished] = decodeInstr([...graphValsRef.current], nextStep)
        if (finished[0]){
            setGraphState('Finished');
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

export default SolveGraph;
