import React, { useRef, useState, useEffect } from "react";
import Bar from "./Bar";
import { asyncSort } from "../algorithmRouter/algorithmRouter";
import { Sleep } from "../../../utils/_utils";
import { useLatestRef } from "../../../hooks/useLatestRef";
import { getDelay } from "../../../utils/_utils";
import { useAsyncOperationController } from "../../../hooks/useAsyncOperationController";

const SortableArray = ({graphVals, algorithm, graphState, setGraphState, speed, maxArrVal}) => {
    

    const startOperation = async (opStateRef) => {
        await asyncSort(graphVals, algorithm, executeNextStep, opStateRef);
    }
    
    const { opStateRef, runOp, pauseOp, abortOp } = useAsyncOperationController(startOperation);

    
    const [barVals, setBarVals] = useState([]);
    const barColorsRef = useRef([]);
    const barValsRef =  useLatestRef(barVals);
    const speedRef = useLatestRef(speed);

    const numBars = graphVals.length;
    const barWidth = 100 / numBars;

    //instantiate bars
    useEffect(() => {
        abortOp();
        updateBarVals(graphVals, new Array(graphVals.length).fill(0));
    }, [graphVals, algorithm]);

    useEffect(() => {
        if (graphState === 'Running'){ 
            runOp();
        }    
        else{
            pauseOp();
        }
    }, [graphState])

    //---executes steps ---//
    const executeNextStep = async (nextStep) => {
        let [newBars, newColors, finished] = decodeInstr([...barValsRef.current], nextStep)
        if (finished[0]){
            setGraphState('Finished');
            return;
        }
        updateBarVals(newBars, newColors);
        const speedDelay = getDelay(500, speedRef.current, barValsRef.current.length); 
        await Sleep(speedDelay);
    }
    

    const decodeInstr = (curVals, instr) => {
        let newBars =  curVals.map(bars => bars.value);
        let newColors = [...barColorsRef.current];
        if (instr[0] === 'finished'){
            return [[-1], [-1], [1]];
        }
        if(instr[0] === 'set'){
            for (let idx in instr[1]){
                newBars[idx] = instr[1][idx];
            }
        }
        if(instr[0] === 'color'){
            for (let idx in instr[1]){
                newColors[idx] = instr[1][idx]
            }
        } 
        return [newBars, newColors, [0]];
    }        
    //helper function to update bar vals
    const updateBarVals = (vals, colorArr) => {
        let barsToUse = vals.map((val, i) => ({
            key: `${i}`,
            value: val,
            width: `${barWidth}%`,
            color: colorArr[i],
        }));
        setBarVals(barsToUse);
        barColorsRef.current = colorArr;
    }

    const bars = barVals.map((val) => (
        <Bar
            key={val.key}
            value={val.value}
            maxValue={maxArrVal}
            width={val.width}
            colorCode={val.color}
            started={graphState === "Running"}
        />)
    )
    return (
        <div className="graph-container">
            {bars}
        </div>
    )
}

export default SortableArray;