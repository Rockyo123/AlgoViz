import React, { useState, useRef } from "react"
import { useContainerDimensions } from "../../../../hooks/useContainerDimensions";
import EditModeGraph from "./EditModeGraph.jsx";
import SolveGraph from "./SolveGraph.jsx";

/**
 * 
 * 
 */
const Graph = (props) => {
    //const [graphVals, setGraphVals] = useState(props.arr);
    const containerRef = useRef(null);
    const squareDimensions = props.arr ? [props.arr.length, props.arr[0].length] : [0, 0];
    const graphDimensions = useContainerDimensions(containerRef);
    
    return (
        <div ref={containerRef} className="graph-grid-responsive-container">
            {!props.start && 
                <EditModeGraph 
                    graphVals = {props.arr}
                    setGraphVals = {props.setGraphVals}
                    editTool = {props.editTool}
                    graphDimensions = {graphDimensions}
                    squareDimensions = {squareDimensions}
                />
            }
            {(props.start && 
                <SolveGraph 
                    arr = {props.arr}
                    algorithm={props.algorithm}
                    start={props.start}
                    speed={props.speed}
                    graphDimensions = {graphDimensions}
                    squareDimensions = {squareDimensions}
                />

            )}
        </div>
    )
}

export default Graph;
