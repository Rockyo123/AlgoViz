import React, {useMemo} from 'react';
import useEditGraph from "../../hooks/useEditGraph.jsx";
import useSolveGraph from "../../hooks/useSolveGraph.jsx";
import GraphSquare from "./GraphSquare.jsx";

/**
 * Graph component that displays a grid of graph values and allows for editing and solving.
 *
 * @param {Array} graph - The current graph values as a 2D array.
 * @param {Function} setGraph - The function to update the graph values.
 * @param {string} editTool - The current editing tool being used (e.g., "brush", "eraser").
 * @param {Object} graphSize - The size of the graph, containing 'x' and 'y' dimensions.
 * @param {Object} graphDimensions - The dimensions of the graph area, including top, left, width, and height.
 * @param {string} speed - The speed setting for the graph algorithm.
 * @param {string} algorithm - The algorithm being used to solve the graph.
 * @param {Object} vizState - The current state of the visualization.
 * @param {Function} setVizState - The function to update the visualization state.
 *
 * @returns {JSX.Element} The rendered graph component.
 */
const Graph = ({graph, setGraph, editTool, graphSize, graphDimensions, speed, algorithm, vizState, setVizState}) => {
    const squareDimensions = graph ? [graphSize['x'], graphSize['y']] : [0, 0];    
    
    // edit graph should affect the actual graph, so it sets graph directly
    const { editMode, editSquare, startEditMode, endEditMode } = useEditGraph(graph, setGraph, editTool, squareDimensions, graphDimensions);
    
    // solve should create its own graph so that the solution and graph can be reset
    const graphVals = useSolveGraph(graph, vizState, setVizState, speed, algorithm);
    
    const graphSquares = useMemo(() => {
        return graphVals.map((row, rowIndex) => (
            <div key={rowIndex} className="graph-grid-row">
                {row.map((val, colIndex) => (
                <GraphSquare 
                    key={`${colIndex}-${val}`} 
                    val={val}
                />
                ))}
          </div>
        ))
    }, [graphVals]);

    return (
        <div className="graph-grid-responsive-container">
            <div className="graph-grid" 
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={(e) => startEditMode(e.button, e.clientX, e.clientY)}
                onMouseMove={(e) => editSquare(editMode, e.clientX, e.clientY)}
                onMouseUp={() => endEditMode()}
                onMouseLeave={() => endEditMode()}
            >
                {graphSquares}
            </div>
        </div>
    )
}

export default Graph;
