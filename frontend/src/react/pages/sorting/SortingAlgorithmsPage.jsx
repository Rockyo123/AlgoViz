import React, {useEffect, useState, useRef} from "react";
import Graph from './components/Graph';
import Slider from '../../components/selectors/Slider';
import DropdownSelector from "../../components/selectors/DropdownSelector";
import InputValsModal from "./components/InputValsModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faPenToSquare, faShuffle} from '@fortawesome/free-solid-svg-icons';
const MAXNUM = 500;
const MAXENTRIES = 1_000;
const ALGS = ["selection", "merge"];
const SortingAlgorithmsPage = (props) => {    

    const [graphState, setGraphState] = useState('NotStarted');
    const [graphVals, setGraphVals] = useState([]);
    const [algorithm, setAlgorithm] = useState('selection');
    const [speed, setSpeed] = useState(50);
    const [numVals, setNumVals] = useState(10);
    
    const [graphStateBtnText, setGraphStateBtnText] = useState("Start");
    const [inputValsModalOpen, setInputValsModalOpen] = useState(false);

    //handle changing graphVals if numVals changed
    useEffect(() => {
        let curVals = [...graphVals];
        if (numVals < curVals.length){
            curVals = curVals.slice(0, numVals-1);
        }
        else if (numVals > curVals.length){
            for (let i = 0; i < numVals; i++){
                curVals.push(Math.floor(Math.random() * MAXNUM) + 1)
            }
        }
        setGraphVals(curVals);
    }, [numVals]); 

    useEffect(() => {
        setGraphState('NotStarted')
    }, [graphVals])
    useEffect(() => {
        let newText = "Start";
        switch (graphState) {
            case "NotStarted":
                newText = "Start";
                break;
            case "Running":
                newText = "Pause";
                break;
            case "Paused":
                newText = "Resume";
                break;
            case "Finished":
                newText = "Finished";
            default:
                break;
        }
        setGraphStateBtnText(newText)
    }, [graphState])

    const toggleGraphState = () => {
        let newState = graphState;
        switch (graphState) {
            case "NotStarted":
            case "Paused":
                newState = "Running";
                break;
            case "Running":
                newState = "Paused"
                break;
            case "Finished":
                randomizeArr();
                newState = "NotStarted"
                break;
            default:
                break;
        }
        setGraphState(newState);
    }


    const randomizeArr = () => {
        let newVals = [];
        for (let i = 0; i < numVals; i++){
            newVals.push(Math.floor(Math.random() * MAXNUM) + 1)
        }
        setGraphVals(newVals)
    }

    const updateGraphValsWithInput = (newVals) => {
        setGraphVals(newVals);
        setNumVals(newVals.length);
    }

    const resetSteps = () => {
        setGraphVals([...graphVals]);
    }
    return (
        <div className="algorithms-page"> 
            <div className="centered-row">
                <h1 className="text-white">
                    Sorting
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


            <div className="centered-row" style={{paddingTop: '50px'}}>
                <div className="centered-col" style={{width: '150px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', width: '100%^'}}>
                        <button className="secondary-btn" onClick={() => randomizeArr()} style={{width: '25%'}}>
                            <FontAwesomeIcon icon={faShuffle} style={{color: "#ffffff",}} />   
                        </button>
                        <button className="secondary-btn" onClick={() => setInputValsModalOpen(true)} style={{width: '25%'}}>
                            <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff",}} />   
                        </button>
                        <button className="secondary-btn" onClick={() => resetSteps()} style={{width: '25%'}}>
                            <FontAwesomeIcon icon={faBackwardStep} style={{color: "#ffffff",}} />   
                        </button>
                    </div>
                    <button className="primary-btn" onClick={() => toggleGraphState()}>
                        {graphStateBtnText}
                    </button>
                </div>
                
            </div>
            <div className="algorithm-viz-wrapper">
                <Graph 
                    graphVals={graphVals}
                    algorithm={algorithm}
                    graphState={graphState}
                    setGraphState={setGraphState}
                    speed={speed / 100}
                    maxNum={MAXNUM}
                />
            </div>

            <InputValsModal 
                isOpen={inputValsModalOpen}
                setIsOpen={setInputValsModalOpen}
                graphVals={graphVals}
                updateGraphVals={updateGraphValsWithInput}
                maxNum = {MAXNUM}
            />
        </div>
    )
}

export default SortingAlgorithmsPage;