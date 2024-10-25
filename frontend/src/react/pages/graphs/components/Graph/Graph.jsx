import React from "react"
import EditModeGraph from "./EditModeGraph.jsx";
import SolvableGraph from "./SolvableGraph.jsx";

/**
 * 
 * 
 */
const Graph = (props) => {
    const squareDimensions = props.graph ? [props.graphSize['x'], props.graphSize['y']] : [0, 0];
    return (
        <div className="graph-grid-responsive-container">
            {props.isEditing && 
                <EditModeGraph 
                    graphVals = {props.graph}
                    setGraphVals = {props.setGraphVals}
                    isEditing = {props.isEditing}
                    editTool = {props.editTool}
                    graphDimensions = {props.graphDimensions}
                    squareDimensions = {squareDimensions}
                />
            }
            {(!props.isEditing) && 
                <SolvableGraph 
                    arr = {props.graph}
                    algorithm={props.algorithm}
                    graphState={props.graphState}
                    setGraphState={props.setGraphState}
                    speed={props.speed}
                    graphDimensions = {props.graphDimensions}
                    squareDimensions = {squareDimensions}
                />

            }
        </div>
    )
}

export default Graph;
