import React, {useState} from "react"
import DropdownSelector from "../../components/selectors/dropdown/DropdownSelector"
import Slider from "../../components/selectors/Slider"
import Graph from "./components/Graph/Graph"
import GraphEditSelector from "./components/GraphEditSelector";
import HeaderSelectorsContainer from "../../components/layout/headerSelectorRow/HeaderSelectorsContainer";
const GraphAlgorithmsPage = (props) => {

    const ALGS = ['', '', '', '', ''];
    const MAXENTRIES = 100;

    const ARR = Array(20).fill().map(() => Array(20).fill(0));

    const [algorithm, setAlgorithm] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editTool, setEditTool] = useState('free');
    const [numVals, setNumVals] = useState(0);
    const [speed, setSpeed] = useState(50);

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
                <HeaderSelectorWithLabel
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
                <div className="full-width centered-row">
                    <div className="full-width centered-col">
                        <GraphEditSelector 
                            editMode={editMode}
                            setEditMode={setEditMode}
                            editTool={editTool}
                            setEditTool={setEditTool}
                        />
                        
                    </div>
                </div>
                <div className="full-width centered-row">
                    <div className="full-width centered-col">
                        <h4 className="text-white">
                            Speed
                        </h4>
                        <Slider 
                            val={speed}
                            setVal={setSpeed}
                            min={1}
                            max={1000}
                        />
                    </div>
                </div>
            </>
            </HeaderSelectorsContainer>


        </div>
        <Graph 
            arr={ARR}
            editMode={editMode}
            editTool={editTool}
        />
    </div>
    )
}

export default GraphAlgorithmsPage