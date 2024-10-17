import React, {useState, useRef} from "react"
import DropdownSelector from "../../components/selectors/dropdown/DropdownSelector"
import Slider from "../../components/selectors/CustomSlider"
import Graph from "./components/Graph/Graph"
import GraphEditSelector from "./components/GraphEditSelector";
import HeaderSelectorsContainer from "../../components/layout/headerSelectorRow/HeaderSelectorsContainer";
import HeaderSelector from "../../components/layout/headerSelectorRow/HeaderSelector";
import AlgorithmResponsiveDisplayWrapper from "../../components/layout/AlgorithmResponsiveDisplayWrapper";
import { useResponsiveGrid } from "../../hooks/useResponsiveGrid";
import { useGraphStateManager } from "../../hooks/useGraphStateManager";
import { MAX_ARR_SIZE, PATHFINDING_ALGS } from "../../constants";

/**
 * graph value meanings:
 *  -5: pathfinding finished, not found
 *  -4: being edited, to blocked
 *  -1: blocked
 *   0: blank
 *   1: start
 *   2: goal
 *   3: visited
 *   4: being edited, to blank
 *   5: pathfinding finished, found
 */
const GraphAlgorithmsPage = (props) => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxArrEntries, yUnits: maxArrVal} = useResponsiveGrid(containerRef, 10, 10, MAX_ARR_SIZE, MAX_ARR_SIZE);
    const { graphState, graphStateBtnText, toggleGraphState, setGraphStateWithVal } = useGraphStateManager(() => {});

    const initializeGraphVals = (rowSize, colSize) => {
        const ARR = Array(colSize).fill().map(() => Array(rowSize).fill(0));
        ARR[0][0] = 1;
        ARR[colSize-1][rowSize-1] = 2;
        return ARR
    }

    const [graphVals, setGraphVals] = useState(initializeGraphVals(30, 30));
    const [algorithm, setAlgorithm] = useState('Depth First Search');
    const [isEditing, setIsEditing] = useState(false);
    const [editTool, setEditTool] = useState('free');
    const [speed, setSpeed] = useState(50);
    
    const clearGraph = () => {
        const newGraph = [];
        for (let i = 0; i < graphVals.length; i++){
            const newGraphRow = [];
            for (let j = 0; j < graphVals[i].length; j++){
                let valToAppend = graphVals[i][j];
                if (valToAppend !== 1 && valToAppend !== 2){
                    valToAppend = 0;
                }
                newGraphRow.push(valToAppend);
            }
            newGraph.push(newGraphRow);
        }
        setGraphVals(newGraph);
    }

    const updateAlgorithm = (newAlg) => {
        setGraphStateWithVal('NotStarted')
        setAlgorithm(newAlg);
    }

    return (
    <div className="algorithms-page"> 
        <div className="full-width centered-row">
            <h1 className="text-white">
                Graphs
            </h1>
        </div>
        <div className="full-width centered-row" style={{paddingTop: '30px'}}>
            <HeaderSelectorsContainer>
            <>
                <HeaderSelector
                    label="Algorithm"
                    selector={
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <DropdownSelector 
                            val={algorithm}
                            setVal={updateAlgorithm}
                            options={PATHFINDING_ALGS}
                        />                            
                    </div>
                    }
                />
                <HeaderSelector
                    label=']]]]'
                    selector={<GraphEditSelector 
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        editTool={editTool}
                        setEditTool={setEditTool}
                        clearGraph={clearGraph}
                    />}
                />
                <HeaderSelector
                    label="Speed"
                    selector={
                       <Slider 
                            val={speed}
                            setVal={setSpeed}
                            min={1}
                            max={1000}
                        />                       
                    }
                />
            </>
            </HeaderSelectorsContainer>
        </div>

        <div className="start-btn-row full-width centered-row">
            <div className="start-btn-col full-width centered-col">
                <button className="primary-btn" onClick={() => toggleGraphState()}>
                    {graphStateBtnText}
                </button>
            </div>
        </div>

        <AlgorithmResponsiveDisplayWrapper                
                containerRef={containerRef}
        >
            <Graph 
                graphDimensions={dispContainerDimensions}
                arr={graphVals}
                setGraphVals={setGraphVals}
                algorithm={algorithm}
                graphState={graphState}
                setGraphState={setGraphStateWithVal}
                speed={speed}
                isEditing={isEditing}
                editTool={editTool}
            />
        </AlgorithmResponsiveDisplayWrapper>
        
    </div>
    )
}

export default GraphAlgorithmsPage