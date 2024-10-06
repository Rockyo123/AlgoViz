import React, { useRef, useState, useEffect } from "react";
import Bar from "./Bar";
import { SelectionSort } from "../_algorithms";

const SortableArray = ({graphVals, algorithm, graphState, setGraphState, speed, maxArrVal}) => {
    const [barVals, setBarVals] = useState([]);
    const barValsRef = useRef(barVals);    
    const queueRef = useRef([]);
    
    const numBars = graphVals.length;
    const barWidth = 100 / numBars;

    //instantiate bars
    useEffect(() => {
        queueRef.current = [];
        updateBarVals(graphVals, new Array(graphVals.length).fill(0));
    }, [graphVals])

    useEffect(() => {
        barValsRef.current = barVals
    }, [barVals])

    //on start, get steps
    useEffect(() => {
        let interval;
        if (graphState === "Running" && queueRef.current.length === 0){
            const newSteps = SelectionSort(graphVals)
            queueRef.current = newSteps;
        }
        if (graphState === "Running"){
            interval = setInterval(() => {
                executeNextStep();
              }, (10 / speed));
        }
        return () => clearInterval(interval);
    }, [graphState, speed])

    //---executes steps in queue---//
    const executeNextStep = () => {
        //--if steps, execute--//
        if (queueRef.current.length > 0){
            const nextStep = queueRef.current.shift();
            //--decode instr
            let [newBars, newColors] = decodeInstr([...barValsRef.current], nextStep)
            updateBarVals(newBars, newColors);
        }
        else{
            setGraphState("Finished");
        }
    }


    const decodeInstr = (curVals, instr) => {
        let newBars =  curVals.map(bars => bars.value);
        let newColors = new Array(graphVals.length).fill(0);
        if(instr[0] === 'swap'){
            let [index1, index2] = instr[1]
            let tmp = newBars[index2];
            newBars[index2] = newBars[index1]
            newBars[index1] = tmp;
        }
        if(instr[0] === 'color'){
            newColors = instr[1];
        }
        return [newBars, newColors];
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