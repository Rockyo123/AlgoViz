import React, { useState, useRef } from "react";
import Graph from '../../graphs/components/Graph/Graph'
import { AVSquare, AlgorithmResponsiveDisplayWrapper } from "../../../components/elements/layout";
import { useResponsiveGrid } from "../../../hooks";
import { useResponsiveGraph } from '../../graphs/hooks/useResponsiveGraph'

/**
 * Square for home page that shows a preview of the pathfinding viz when hovered or focused. 
 * On click, will navigate to that page
 * @param {Function} handleClick - Sends back link to graph page to navigate to when square clicked
 * @returns graph viz Preview Square.
 */
const GraphPreviewSquare = ({ handleClick }) => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxXUnits, yUnits: maxYUnits} = useResponsiveGrid(containerRef, 40, 40, 10, 10);
    const [ graph, graphSize, updateGraphSize, updateGraphVals ] = useResponsiveGraph(maxXUnits, maxYUnits);

    const [graphState, setGraphState] = useState('NotRunning');
    const [isFocused, setIsFocused] = useState(false);

    const updateIsFocused = (focused) => {
        let newGraphState = "NotRunning"
        if (focused) newGraphState = "Running";
        if (!focused) updateGraphVals(graph);
        setGraphState(newGraphState);
        setIsFocused(focused);
    }

    return (
        <AVSquare
            disabled={false}
            onClick={() => handleClick('/graphs')}
            setIsFocused={updateIsFocused}  
        >
            <h2 className="text-white">
                Graphs
            </h2>
            <div 
                className="preview-algoViz-wrapper"
            >
                <AlgorithmResponsiveDisplayWrapper                
                    containerRef={containerRef}
                >
                     <Graph 
                        graphDimensions={dispContainerDimensions}
                        graph={graph}
                        graphSize={graphSize}
                        setGraph={updateGraphVals}
                        algorithm={'Breadth First Search'}
                        graphState={graphState}
                        setGraphState={setGraphState}
                        speed={1.5}
                        editTool={null}
                    />
                </AlgorithmResponsiveDisplayWrapper>
            </div>
    </AVSquare>
    );
}

export default GraphPreviewSquare;