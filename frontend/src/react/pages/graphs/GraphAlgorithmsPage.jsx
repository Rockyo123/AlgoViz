import React, {useState} from "react"
import DropdownSelector from "../../components/selectors/dropdown/DropdownSelector"
import Slider from "../../components/selectors/Slider"
import Graph from "./components/Graph/Graph"
const GraphAlgorithmsPage = (props) => {

    const ALGS = ['', '', '', '', ''];
    const MAXENTRIES = 100;

    const ARR = Array(20).fill().map(() => Array(20).fill(0));

    const [algorithm, setAlgorithm] = useState('');
    const [numVals, setNumVals] = useState(0);
    const [speed, setSpeed] = useState(50);

    return (
    <div className="algorithms-page"> 
        <div className="centered-row">
            <h1 className="text-white">
                Graphs
            </h1>
        </div>
        <div className="centered-row" style={{paddingTop: '30px'}}>
            <div className="header-selectors-row">
                <div className="centered-row">
                    <div className="centered-col">
                        <h4 className="text-white">
                            Algorithm
                        </h4>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <DropdownSelector 
                                val={algorithm}
                                setVal={setAlgorithm}
                                options={ALGS}
                            />                            
                        </div>
                    </div>
                </div>
                <div className="centered-row">
                    <div className="centered-col">
                        <h4 className="text-white">
                            Num Entries   
                        </h4>
                        <Slider 
                            val={numVals}
                            setVal={setNumVals}
                            min={10}
                            max={MAXENTRIES}
                            tooltip={"auto"}
                        />
                    </div>
                </div>
                <div className="centered-row">
                    <div className="centered-col">
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
            </div>
        </div>
        <Graph 
            arr={ARR}
        
        />
    </div>
    )
}

export default GraphAlgorithmsPage