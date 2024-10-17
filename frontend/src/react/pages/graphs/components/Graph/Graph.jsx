import React from "react"
import EditModeGraph from "./EditModeGraph.jsx";
import SolvableGraph from "./SolvableGraph.jsx";

/**
 * 
 * 
 */
const Graph = (props) => {
    const squareDimensions = props.arr ? [props.arr.length, props.arr[0].length] : [0, 0];
    
    return (
        <div className="graph-grid-responsive-container">
            {props.isEditing && 
                <EditModeGraph 
                    graphVals = {props.arr}
                    setGraphVals = {props.setGraphVals}
                    isEditing = {props.isEditing}
                    editTool = {props.editTool}
                    graphDimensions = {props.graphDimensions}
                    squareDimensions = {squareDimensions}
                />
            }
            {(!props.isEditing) && 
                <SolvableGraph 
                    arr = {props.arr}
                    algorithm={props.algorithm}
                    graphState={props.graphState}
                    speed={props.speed}
                    graphDimensions = {props.graphDimensions}
                    squareDimensions = {squareDimensions}
                />

            }
        </div>
    )
}

export default Graph;
