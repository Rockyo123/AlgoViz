import React, {useState, useRef} from "react"
import DropdownSelector from "../../components/selectors/dropdown/DropdownSelector"
import Slider from "../../components/selectors/CustomSlider"
import Graph from "./components/Graph/Graph"
import GraphEditToolSelector from "./components/GraphEditToolSelector";
import HeaderSelectorsContainer from "../../components/layout/headerSelectorRow/HeaderSelectorsContainer";
import HeaderSelector from "../../components/layout/headerSelectorRow/HeaderSelector";
import AlgorithmResponsiveDisplayWrapper from "../../components/layout/AlgorithmResponsiveDisplayWrapper";
import { useResponsiveGrid } from "../../hooks/useResponsiveGrid";
import { useResponsiveGraph } from "./hooks/useResponsiveGraph";
import { useGraphStateManager } from "../../hooks/useGraphStateManager";
import { MAX_GRAPH_SIZE, PATHFINDING_ALGS } from "../../constants";
import FontAwesomeBtn from "../../components/basics/FontAwesomeBtn";
import { faBackwardStep, faPenToSquare, faShuffle} from '@fortawesome/free-solid-svg-icons';

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
    const {containerDimensions: dispContainerDimensions, xUnits: maxXUnits, yUnits: maxYUnits} = useResponsiveGrid(containerRef, 20, 20, MAX_GRAPH_SIZE, MAX_GRAPH_SIZE);
    const [ graph, graphSize, updateGraphSize, updateGraphVals, randomizeGraph ] = useResponsiveGraph(maxXUnits, maxYUnits);

    const [graphVals, setGraphVals] = useState([[]]);
    const [algorithm, setAlgorithm] = useState('Depth First Search');
    const [isEditing, setIsEditing] = useState(false);
    const [editTool, setEditTool] = useState('free');
    const [speed, setSpeed] = useState(50);
    const [inputValsModalOpen, setInputValsModalOpen] = useState(false);

    const { graphState, graphStateBtnText, toggleGraphState, setGraphStateWithVal } = useGraphStateManager(() => updateGraphVals(graph), [graph, algorithm]);

    
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
    
    /*const randomizeGraph = () => {
       
    } */

    
    const resetSteps = () => {
        //updateArrayVals([...array]);
    }

    return (
    <div className="algorithms-page"> 
        <div className="full-width centered-row">
            <h1 className="text-white">
                Graphs
            </h1>
        </div>
        <div className="full-width centered-row">
            <HeaderSelectorsContainer>
                <HeaderSelector
                    label="Algorithm"
                    selector={
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <DropdownSelector 
                            val={algorithm}
                            setVal={setAlgorithm}
                            options={PATHFINDING_ALGS}
                        />                            
                    </div>
                    }
                />
                <HeaderSelector
                    label='Edit Graph'
                    selector={
                    <GraphEditToolSelector 
                        disabled={graphState !== 'NotStarted'}
                        editTool={editTool}
                        setEditTool={setEditTool}
                        graphSize={graphSize}
                        setGraphSize={updateGraphSize}
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
            </HeaderSelectorsContainer>
        </div>

        <div className="start-btn-row full-width centered-row">
            <div className="start-btn-col full-width centered-col">
                <div className="full-width space-between-row space-below">
                    <FontAwesomeBtn
                        icon={faShuffle}
                        onClick={() => randomizeGraph()}
                        customStyle={{flexGrow: 1, marginRight: '3%'}}
                            
                    />
                    <FontAwesomeBtn
                        icon={faPenToSquare}
                        onClick={() => setInputValsModalOpen(!inputValsModalOpen)}
                        customStyle={{flexGrow: 1, marginLeft: '3%', marginRight: '3%'}}
                    />
                    <FontAwesomeBtn
                        icon={faBackwardStep}
                        onClick={() => resetSteps()}
                        customStyle={{flexGrow: 1, marginLeft: '3%'}}
                    />
                </div>
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
                graph={graph}
                graphSize={graphSize}
                setGraphVals={updateGraphVals}
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