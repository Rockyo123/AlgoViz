import React, {useState, useRef} from "react";
import SortableArray from './components/SortableArray';
import DropdownSelector from "@/components/elements/dropdown/DropdownSelector";
import PlaybackBtnSection from "@/components/elements/playback/playbackBtnSection";
import { HeaderSelectorsContainer, HeaderSelector, AlgorithmResponsiveDisplayWrapper, Slider } from "@/components/elements/layout";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { useResponsiveArray } from "./hooks/useResponsiveArray";
import { useVizStateManager } from "@/hooks/useVizStateManager";
import {MAX_ARRAY_VAL, MAX_ARRAY_ENTRIES, SORTING_ALGS} from '@/constants'; 


const SortingAlgorithmsPage = () => {    
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxArrEntries, yUnits: maxArrVal} = useResponsiveGrid(containerRef, 1, 1, MAX_ARRAY_ENTRIES, MAX_ARRAY_VAL);
    const [array, updateArrayVals, randomizeArrayVals, updateArrayLength] = useResponsiveArray(maxArrVal, maxArrEntries);

    const [algorithm, setAlgorithm] = useState('Selection Sort');
    const [speed, setSpeed] = useState(50);

    const { vizState, vizStateBtnText, toggleVizState, setVizStateWithVal } = useVizStateManager(randomizeArrayVals, [array, algorithm]);
    
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

            <PlaybackBtnSection 
            randomizeGraph={randomizeArrayVals}
            resetSteps={resetSteps}
            toggleVizState={toggleVizState}
            btnText={vizStateBtnText}
        />
            
            <AlgorithmResponsiveDisplayWrapper                
                containerRef={containerRef}
            >
                <SortableArray 
                    graphVals={array}
                    algorithm={algorithm}
                    vizState={vizState}
                    setVizState={setVizStateWithVal}
                    speed={speed / 100}
                    maxArrVal={maxArrVal}
                />
            </AlgorithmResponsiveDisplayWrapper>
        </div>
    )
}

export default SortingAlgorithmsPage;