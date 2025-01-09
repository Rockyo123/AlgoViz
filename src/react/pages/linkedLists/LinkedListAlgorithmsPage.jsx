import React, {useState, useRef} from "react";
import DropdownSelector from "@/components/elements/dropdown/DropdownSelector";
import PlaybackBtnSection from "@/components/elements/playback/PlaybackBtnSection";
import { HeaderSelectorsContainer, HeaderSelector, AlgorithmResponsiveDisplayWrapper, Slider } from "@/components/elements/layout";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { useVizStateManager } from "@/hooks/useVizStateManager";
import { MAX_LIST_NODES } from '@/constants';
import { useResponsiveLinkedList } from "./hooks/useResponsiveLinkedList";
import LinkedListViz from "./components/LinkedListViz";

const LinkedListAlgorithmsPage = (props) => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxXUnits, yUnits: maxYUnits} = useResponsiveGrid(containerRef, 80, 80, MAX_LIST_NODES, MAX_LIST_NODES);
    const [ linkedList, linkedListChangedFlag, updateLinkedList, randomizeLinkedList, resetList ] = useResponsiveLinkedList(Math.max(maxXUnits, maxYUnits));

    const [algorithm, setAlgorithm] = useState('Breadth First Search');
    const [speed, setSpeed] = useState(50);
    const [target, setTarget] = useState(20);
    const { vizState, vizStateBtnText, toggleVizState, setVizStateWithVal } = useVizStateManager(resetList, [linkedList, algorithm]);
    
    const resetSteps = () => {
        resetList();
    }

    return (
    <div className="algorithms-page"> 
        <div className="full-width centered-row">
            <h1 className="text-white">
                Linked Lists
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
                                val={'Linked List Search'}
                                setVal={() => {}}
                                options={['Linked List Search']}
                            />                            
                        </div>
                    }
                />
                <HeaderSelector
                    label={"Target"}
                    selector={
                        <input
                            className="av-input"
                            type='number'
                            value={target}
                            style={{maxWidth: '90%'}}
                            aria-label="target value"
                            onChange={(e) => setTarget(parseInt(e.target.value))}
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
            randomizeGraph={() => randomizeLinkedList()}
            resetSteps={resetSteps}
            toggleVizState={toggleVizState}
            btnText={vizStateBtnText}
        />
        
        <AlgorithmResponsiveDisplayWrapper                
            containerRef={containerRef}
        >
            <LinkedListViz
                linkedList={linkedList}
                linkedListChangedFlag={linkedListChangedFlag}
                updateLinkedList={updateLinkedList}
                maxListLength={maxXUnits}
                containerDimensions={dispContainerDimensions}
                listState={vizState}
                setListState={setVizStateWithVal}
                editable={true}
                speed={speed}
                target={target}
                algorithm={algorithm}
            />
        </AlgorithmResponsiveDisplayWrapper>
    </div>
    );
}

export default LinkedListAlgorithmsPage;