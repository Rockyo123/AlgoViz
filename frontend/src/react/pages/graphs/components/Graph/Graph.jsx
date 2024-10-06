import React, { useState, useRef } from "react"
import { useContainerDimensions } from "../../../../hooks/useContainerDimensions";
import EditModeGraph from "./EditModeGraph.jsx";
import SolveGraph from "./SolveGraph.jsx";
/**
 * 
 * 
 */
const Graph = (props) => {
    const [graphVals, setGraphVals] = useState(props.arr);
    const containerRef = useRef(null);
    const squareDimensions = props.arr ? [props.arr.length, props.arr[0].length] : [0, 0];
    const graphDimensions = useContainerDimensions(containerRef);
    
    return (
        <div ref={containerRef} className="graph-grid-responsive-container">
            {props.editMode && 
                <EditModeGraph 
                    graphVals = {graphVals}
                    setGraphVals = {setGraphVals}
                    editTool = {props.editTool}
                    graphDimensions = {graphDimensions}
                    squareDimensions = {squareDimensions}
                />
            }
            {(!props.editMode && 
                <SolveGraph 
                    arr = {graphVals}
                    graphDimensions = {graphDimensions}
                    squareDimensions = {squareDimensions}
                />

            )}
        </div>
    )
}

export default Graph;
