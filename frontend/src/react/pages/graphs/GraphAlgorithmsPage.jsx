import React, {useState, useRef} from "react"
import DropdownSelector from "../../components/selectors/dropdown/DropdownSelector"
import Slider from "../../components/selectors/CustomSlider"
import Graph from "./components/Graph/Graph"
import GraphEditSelector from "./components/GraphEditSelector";
import HeaderSelectorsContainer from "../../components/layout/headerSelectorRow/HeaderSelectorsContainer";
import HeaderSelector from "../../components/layout/headerSelectorRow/HeaderSelector";
import AlgorithmResponsiveDisplayWrapper from "../../components/layout/AlgorithmResponsiveDisplayWrapper";
import { useResponsiveGrid } from "../../hooks/useResponsiveGrid";

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
    const {containerDimensions: dispContainerDimensions, xUnits: maxArrEntries, yUnits: maxArrVal} = useResponsiveGrid(containerRef, 1, 1, 100, 100);

    const ALGS = ['Depth First Search', 'Breadth First Search'];
    const MAXENTRIES = 100;

    const ARR = Array(30).fill().map(() => Array(30).fill(0));
    ARR[0][0] = 1;
    ARR[29][29] = 2;

    const [algorithm, setAlgorithm] = useState('Depth First Search');
    const [editMode, setEditMode] = useState(false);
    const [editTool, setEditTool] = useState('free');
    const [numVals, setNumVals] = useState(0);
    const [speed, setSpeed] = useState(50);
    const [start, setStart] = useState(false);
    

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
                            setVal={setAlgorithm}
                            options={ALGS}
                        />                            
                    </div>
                    }
                />
                <HeaderSelector
                    selector={<GraphEditSelector 
                        editMode={editMode}
                        setEditMode={setEditMode}
                        editTool={editTool}
                        setEditTool={setEditTool}
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
            <button className="btn-primary" onClick={() => setStart(!start)}>
                Start
            </button>

        </div>
        <AlgorithmResponsiveDisplayWrapper                
                containerRef={containerRef}
        >
            <Graph 
                arr={ARR}
                algorithm={algorithm}
                start={start}
                speed={speed}
                editMode={editMode}
                editTool={editTool}
            />
        </AlgorithmResponsiveDisplayWrapper>
        
    </div>
    )
}

export default GraphAlgorithmsPage