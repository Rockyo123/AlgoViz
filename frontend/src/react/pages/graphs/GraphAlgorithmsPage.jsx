import React, {useState, useRef} from "react"
import Graph from "./components/Graph/Graph"
import GraphEditingToolbar from "./components/GraphEditingToolbar"
import { HeaderSelectorsContainer, HeaderSelector, AlgorithmResponsiveDisplayWrapper, Slider, FontAwesomeBtn } from "../../components/elements/layout";
import { Dropdown } from "../../components/elements/dropdown";
import { useResponsiveGrid, useGraphStateManager } from "../../hooks"
import { useResponsiveGraph } from "./hooks/useResponsiveGraph";
import { MAX_GRAPH_SIZE, PATHFINDING_ALGS } from "../../constants";
import { faBackwardStep, faPenToSquare, faShuffle} from '@fortawesome/free-solid-svg-icons';

const GraphAlgorithmsPage = () => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxXUnits, yUnits: maxYUnits} = useResponsiveGrid(containerRef, 20, 20, MAX_GRAPH_SIZE, MAX_GRAPH_SIZE);
    const [ graph, graphSize, updateGraphSize, updateGraphVals ] = useResponsiveGraph(maxXUnits, maxYUnits);
    
    const [algorithm, setAlgorithm] = useState('Depth First Search');
    const [editTool, setEditTool] = useState('free');
    const [speed, setSpeed] = useState(50);
    const [inputValsModalOpen, setInputValsModalOpen] = useState(false);

    const { graphState, graphStateBtnText, toggleGraphState, setGraphStateWithVal } = useGraphStateManager(() => updateGraphVals(graph), [graph, algorithm]);

    const clearGraph = () => {
        const newGraph = [];
        for (let i = 0; i < graph.length; i++){
            const newGraphRow = [];
            for (let j = 0; j < graph[i].length; j++){
                let valToAppend = graph[i][j];
                if (valToAppend !== 1 && valToAppend !== 2){
                    valToAppend = 0;
                }
                newGraphRow.push(valToAppend);
            }
            newGraph.push(newGraphRow);
        }
        updateGraphVals(newGraph);
    }
    
    const randomizeGraph = () => {
       const newGraph = [];
       for (let i = 0; i < graphSize['x']; i++){
            const newRow = []
            for (let j = 0; j < graphSize['y']; j++){
                if (graph[i][j] === 1 || graph[i][j] === 2){
                    newRow.push(graph[i][j]);
                    continue;
                }
                newRow.push(Math.random() < 0.25 ? -1 : 0);
            }
            newGraph.push(newRow);
       }
       updateGraphVals(newGraph);
    }

    
    const resetSteps = () => {
        updateGraphVals([...graph]);
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
                        <Dropdown 
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
                    <GraphEditingToolbar  
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
                setGraph={updateGraphVals}
                algorithm={algorithm}
                graphState={graphState}
                setGraphState={setGraphStateWithVal}
                speed={speed}
                editTool={editTool}
            />
        </AlgorithmResponsiveDisplayWrapper>
    </div>
    )
}

export default GraphAlgorithmsPage