import React, {useEffect, useState, useRef} from "react";
import SortableArray from './components/SortableArray';
import Slider from '../../components/selectors/Slider';
import DropdownSelector from "../../components/selectors/dropdown/DropdownSelector";
import InputValsModal from "./components/InputValsModal";
import { faBackwardStep, faPenToSquare, faShuffle} from '@fortawesome/free-solid-svg-icons';
import HeaderSelectorsContainer from "../../components/layout/headerSelectorRow/HeaderSelectorsContainer";
import HeaderSelector from "../../components/layout/headerSelectorRow/HeaderSelector";
import FontAwesomeBtn from "../../components/basics/FontAwesomeBtn";
import AlgorithmResponsiveDisplayWrapper from "../../components/layout/AlgorithmResponsiveDisplayWrapper";
import { useResponsiveGrid } from "../../hooks/useResponsiveGrid";
import { useResponsiveArray } from "./hooks/useResponsiveArray";
import {MAX_ARRAY_VAL, MAX_ARRAY_ENTRIES, SORTING_ALGS} from '../../constants'; 


const SortingAlgorithmsPage = (props) => {    
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxArrEntries, yUnits: maxArrVal} = useResponsiveGrid(containerRef, 1, 1, MAX_ARRAY_ENTRIES, MAX_ARRAY_VAL);
    const [array, updateArrayVals, randomizeArrayVals, updateArrayLength] = useResponsiveArray(maxArrVal, maxArrEntries);
    const [graphState, setGraphState] = useState('NotStarted');
    const [algorithm, setAlgorithm] = useState('Selection Sort');
    const [speed, setSpeed] = useState(50);

    const [graphStateBtnText, setGraphStateBtnText] = useState("Start");
    const [inputValsModalOpen, setInputValsModalOpen] = useState(false);



    useEffect(() => {
        setGraphState('NotStarted')
    }, [array])

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
                randomizeArrayVals();
                newState = "NotStarted"
                break;
            default:
                break;
        }
        setGraphState(newState);
    }

    const resetSteps = () => {
        updateArrayVals([...array]);
    }
    return (
        <div className="algorithms-page"> 
            <div className="full-width centered-row">
                <h1 className="text-white">
                    Sorting
                </h1>
            </div>
            <div className="full-width centered-row">
                <HeaderSelectorsContainer>
                <>
                    <HeaderSelector
                        label={"Algorithm"}
                        selector={
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <DropdownSelector 
                                    val={algorithm}
                                    setVal={setAlgorithm}
                                    options={SORTING_ALGS}
                                />                            
                            </div>
                        }
                    />
                    <HeaderSelector
                        label={"Num Entries"}
                        selector={
                            <Slider 
                                val={array.length}
                                setVal={updateArrayLength}
                                min={10}
                                max={maxArrEntries}
                                tooltip={"auto"}
                            />
                        }
                    />
                    <HeaderSelector
                        label={"Speed"}
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
                    <div className="full-width space-between-row" style={{paddingBottom: '10px'}}>
                        <FontAwesomeBtn
                            icon={faShuffle}
                            onClick={() => randomizeArrayVals()}
                            customStyle={{flexGrow: 1, marginRight: '3%'}}
                                
                        />
                        <FontAwesomeBtn
                            icon={faPenToSquare}
                            onClick={() => setInputValsModalOpen()}
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
                <SortableArray 
                    graphVals={array}
                    algorithm={algorithm}
                    graphState={graphState}
                    setGraphState={setGraphState}
                    speed={speed / 100}
                    maxArrVal={maxArrVal}
                />
            </AlgorithmResponsiveDisplayWrapper>

            {/*<InputValsModal 
                isOpen={inputValsModalOpen}
                setIsOpen={setInputValsModalOpen}
                graphVals={array}
                updateGraphVals={updateArrayVals}
                maxArrVal = {maxArrVal}
            /> */}
        </div>
    )
}

export default SortingAlgorithmsPage;